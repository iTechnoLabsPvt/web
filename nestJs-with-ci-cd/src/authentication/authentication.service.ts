import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { AuthorizationCodeDTO } from '../shared/external/google/dtos/authorization-code.dto';
import { GoogleService } from '../shared/external/google/google.service';
import { JwtPayload } from './interfaces/jwt.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { SubscriptionService } from '../modules/subscription/subscription.service';
@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private googleService: GoogleService,
    private subscriptionService: SubscriptionService
  ) {}

  async login(request: AuthorizationCodeDTO): Promise<any> {
    const { authorization_code } = request;

    const tokens = await this.googleService.getTokens(authorization_code);

    const token_info = await this.googleService.getTokenInfo(
      tokens.tokens.access_token,
    );

    const email_address = token_info.email;

    const user = await this.userService.getUserByEmail(email_address);

    if (!user) {
      await this.googleService.revokeToken(tokens.tokens.access_token);
      //todo: create an account for them and prompt the user to complete registration.
      throw new UnauthorizedException(
        'User does not exist. Please create an account to continue',
      );
    }

    // todo: check this tomorrow
    if (
      user &&
      !user.initial_google_calendar_metrics_computed &&
      !user.initial_google_mail_metrics_computed
    ) {
      throw new UnauthorizedException(
        'Please be patient. We are currently computing your metrics. Please try again after few minutes',
      );
    }

    /*GET SUBSCRIPTION DETAILS*/
    const subscription = await this.subscriptionService.subscriptionDetail({user_id: String(user.id)});

    const payload: JwtPayload = {
      department: user.department,
      email_address: user.email_address,
      first_name: user.first_name,
      google_user_id: user.google_user_id,
      industry: user.industry,
      last_name: user.last_name,
      picture: user.picture,
    };

    const signed_token = this.jwtService.sign(payload);

    await this.userService.updateGoogleAuthToken(user, signed_token);

    const loginResponse: LoginResponse = {
      access_token: signed_token,
      department: user.department,
      first_name: user.first_name,
      industry: user.industry,
      last_name: user.last_name,
      picture: user.picture,
      subscription: subscription,
    };

    return loginResponse;
  }
}
