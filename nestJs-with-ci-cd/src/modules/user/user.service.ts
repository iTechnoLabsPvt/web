import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AuthorizationCodeDTO } from '../../shared/external/google/dtos/authorization-code.dto';
import { GoogleService } from '../../shared/external/google/google.service';
import { SlackTokenExchange } from '../../shared/external/slack/interfaces/token-exchange.interface';
import { SlackService } from '../../shared/external/slack/slack.service';
import { Member } from '../member/member.entity';
import { MemberService } from '../member/member.service';
import { MetricsService } from '../metrics/metrics.service';
import { AddMembersDTO, CreateUserDTO } from './dtos/create-user.dto';
import { RegistrationStage } from './enums/registration-stages.enum';
import {
  BasicInformation,
  SubscriptionInformation,
  TeamMember,
  UserProfileResponse,
} from './interfaces/responses/user-profile.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserSubscription } from './subscription.repository';
import * as moment from 'moment';
import { ComputationTypeEnum } from '../metrics/enums/computation-type.enum';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userSubscription: UserSubscription,
    private employeeService: MemberService,
    private googleService: GoogleService,
    private slackService: SlackService,
    @Inject(forwardRef(() => MetricsService))
    private metricsService: MetricsService,
  ) {}

  /**
   * Begins application of a user
   * @param request
   * @returns model containing parameters required for slack step
   */
  async createAccount(request: AuthorizationCodeDTO): Promise<CreateUserDTO> {
    const { authorization_code } = request;
    let tokens;
    try {
      tokens = await this.googleService.getTokens(authorization_code);
    } catch (error) {
      throw new BadRequestException(
        'Invalid authorization. Please re-authorize google',
      );
    }
    const user_google_details = await lastValueFrom(
      this.googleService.getUserInfo(tokens.tokens.id_token),
    );

    const user_details = await this.getUserByEmail(
      user_google_details.data.email,
    );

    if (user_details) {
      const model: any = {
        id: +user_details.id,
        progress: user_details.progress,
        email_address: user_details.email_address,
        message: `Hi ${user_details.first_name}, please complete your registration...`,
        stripe_customer_id: user_details.stripe_customer_id,
      };
      if (
        user_details.progress === RegistrationStage.GOOGLE_COMPLETE ||
        user_details.progress === RegistrationStage.SLACK_COMPLETE
      ) {
        throw new ConflictException(model);
      } else {
        throw new ConflictException(
          'User already exist. Please proceed to login...',
        );
      }
    } else {
      if (!tokens.tokens.refresh_token) {
        await this.googleService.revokeToken(tokens.tokens.access_token);
        throw new BadRequestException(
          'This should not happen. Please can you restart your registration.',
        );
      }
      const request = new CreateUserDTO();

      /*CREATE STRIPE CUSTOMER*/
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const customer = await stripe.customers.create({
        email: user_google_details.data.email,
        name:
          user_google_details.data.given_name +
          ' ' +
          user_google_details.data.family_name,
      });

      request.email_address = user_google_details.data.email;
      request.first_name = user_google_details.data.given_name;
      request.last_name = user_google_details.data.family_name;
      request.google_user_id = user_google_details.data.sub;
      request.picture = user_google_details.data.picture;
      request.google_refresh_token = tokens.tokens.refresh_token;
      request.google_access_token = tokens.tokens.access_token;
      request.stripe_customer_id = customer.id;

      this.googleService.setAllCredentials(tokens.tokens);
      const info = await this.googleService.getTokenInfo(
        tokens.tokens.access_token,
      );
      request.google_scopes = JSON.stringify(info.scopes);
      const user = await this.userRepository.createAccount(request);

      const model: any = {
        id: +user.id,
        progress: user.progress,
        email_address: user.email_address,
        stripe_customer_id: customer.id,
        message:
          'You have successfully created an account. Please proceed to add your slack.',
      };
      return model;
    }
  }

  /**
   * Add slack authorization of a user
   * @param request
   * @returns model containing parameters required for add members step
   */
  async authorizeSlack(request: AuthorizationCodeDTO): Promise<any> {
    if (request.id == null) {
      throw new BadRequestException('User ID is required');
    }
    const slack_request_model: SlackTokenExchange = {
      authorization_code: request.authorization_code,
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      redirect_url: process.env.SLACK_REDIRECT_URL,
    };
    const response = await lastValueFrom(
      this.slackService.exchangeTemporaryAuthorizationCodeForAccessToken(
        slack_request_model,
      ),
    );

    if (response.data.ok == false) {
      throw new BadRequestException(
        'Authorization is invalid. Re-authenticate slack',
      );
    }
    if (!response.data) {
      throw new UnauthorizedException(
        'Could not authorize slack. Please contact administrator',
      );
    }
    const user = await this.getUserById(request.id);
    if (!user) {
      throw new NotFoundException('User not found. Please create an account');
    }

    const update_slack_data = await this.updateSlackAccessToken(
      response.data.authed_user.access_token,
      response.data.authed_user.id,
      user,
    );
    const model: any = {
      id: +update_slack_data.id,
      progress: user.progress,
      email_address: user.email_address,
      message:
        'You have successfully added slack. Please proceed to adding members.',
    };
    return model;
  }

  /**
   * Created members of a user
   * @param request
   * @returns created user
   */
  async createMembers(request: AddMembersDTO): Promise<any> {
    try {
      const found = await this.userRepository.getUserById(request.id);

      if (found && found.progress === RegistrationStage.MEMBERS_COMPLETE) {
        throw new ConflictException('User already exist. Please login...');
      }
      const members: Member[] = [];
      for (const m of request.members) {
        if (
          await this.employeeService.userMemberExist(found, m.email_address)
        ) {
          continue;
        } else {
          const saved = await this.employeeService.createMember(m);
          members.push(saved);
        }
      }

      found.industry = request.industry;
      found.department = request.department;
      found.agree_terms_and_conditions = true;
      found.progress = RegistrationStage.MEMBERS_COMPLETE;
      found.members = members;

      const user_update = await this.userRepository.save(found);
      return user_update;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param email_address
   * @returns user details
   */
  async getUserByEmail(email_address: string): Promise<User> {
    return await this.userRepository.getUserByEmail(email_address);
  }

  async updateGoogleAuthToken(user: User, signed_token: string): Promise<User> {
    user.access_token = signed_token;
    user.last_login_date = new Date();

    return await this.userRepository.save(user);
  }

  async updateSlackAccessToken(
    slack_access_token: string,
    slack_user_id: string,
    user: User,
  ): Promise<User> {
    if (slack_access_token == null || slack_user_id == null) {
      throw new BadRequestException('Access token and user id are required');
    }

    user.slack_access_token = slack_access_token;
    user.slack_user_id = slack_user_id;
    user.progress = RegistrationStage.SLACK_COMPLETE;
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find({
      relations: ['members'],
    });
    return users;
  }

  async updateInitialMetricStatus(
    user: User,
    computation_type: ComputationTypeEnum,
  ): Promise<User> {
    return await this.userRepository.updateInitialMetricComputation(
      user,
      computation_type,
    );
  }
  async getUserById(id: number): Promise<User> {
    if (id == null) {
      throw new BadRequestException('ID is required');
    }

    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      return null;
    }

    return user;
  }

  async getUserProfile(auth_user: User): Promise<UserProfileResponse> {
    const basic_information: BasicInformation = {
      avatar: auth_user.picture,
      first_name: auth_user.first_name,
      last_name: auth_user.last_name,
      email_address: auth_user.email_address,
      department: auth_user.department,
      industry: auth_user.industry,
      number_of_employees: auth_user?.members.length ?? 0,
      slack_permission_granted:
        auth_user?.slack_user_id !== null &&
        auth_user?.slack_access_token !== null,
      google_permission_granted:
        auth_user?.google_user_id !== null &&
        auth_user?.google_refresh_token !== null,
    };
    const team_information: TeamMember[] = [];
    if (auth_user?.members && auth_user.members.length > 0) {
      for (const m of auth_user.members) {
        const tenure = this.getTenure(m?.start_date);

        const member: TeamMember = {
          first_name: m.first_name,
          last_name: m.last_name,
          department: m.department,
          email_address: m.email_address,
          start_date: moment(m.start_date).format('MMMM YYYY'),
          title: m.title,
          tenure: tenure,
        };
        team_information.push(member);
      }
    }

    const subscription_information: SubscriptionInformation = {
      current_subscription: 'Free trial',
      renewal_date: moment()
        .add(1, 'month')
        .startOf('month')
        .format('DD MMMM, YYYY'),
      signup_date: moment(auth_user?.createdAt).format('DD MMMM, YYYY'),
    };
    const response: UserProfileResponse = {
      basic_information: basic_information,
      team_information: team_information,
      subscription_information: subscription_information,
    };

    return response;
  }

  getTenure(member_start_date: Date): string {
    const start_date = moment();
    const difference_in_dates: number = start_date.diff(
      moment(member_start_date),
      'days',
    );

    const end_date = moment().add(difference_in_dates, 'days');

    const years = end_date.diff(start_date, 'year');
    start_date.add(years, 'years');

    const months = end_date.diff(start_date, 'months');
    start_date.add(months, 'months');

    return `${years} years ${months} months`;
  }
}
