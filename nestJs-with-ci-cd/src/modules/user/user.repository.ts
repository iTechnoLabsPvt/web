import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ComputationTypeEnum } from '../metrics/enums/computation-type.enum';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserByEmail(email_address: string): Promise<User> {
    const user = await this.findOne({
      where: { email_address },
    });

    if (!user) {
      return null;
    }
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.findOne({
      where: { id },
      relations: ['members'],
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateInitialMetricComputation(
    user: User,
    computation_type: ComputationTypeEnum,
  ): Promise<User> {
    const user_to_update = await this.getUserById(user.id);
    if (user_to_update) {
      if (computation_type === ComputationTypeEnum.COMPUTE_CALENDAR) {
        user_to_update.initial_google_calendar_metrics_computed = true;
      } else if (computation_type === ComputationTypeEnum.COMPUTE_GMAIL) {
        user_to_update.initial_google_mail_metrics_computed = true;
      } else if (computation_type === ComputationTypeEnum.COMPUTE_SLACK) {
        user_to_update.initial_slack_metrics_computed = true;
      }
      const response = await this.save(user_to_update);
      return response;
    }
  }

  async createAccount(request: CreateUserDTO): Promise<User> {
    const model = this.create({
      google_user_id: request.google_user_id,
      last_name: request.last_name,
      first_name: request.first_name,
      email_address: request.email_address,
      picture: request.picture,
      google_refresh_token: request.google_refresh_token,
      google_access_token: request.google_access_token,
      google_scopes: request.google_scopes,
      stripe_customer_id: request.stripe_customer_id,
    });

    const user = await this.save(model);
    return user;
  }
}
