import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Subscription } from './subscription.entity';

@Injectable()
export class UserSubscription extends Repository<Subscription> {
  constructor(private dataSource: DataSource) {
    super(Subscription, dataSource.createEntityManager());
  }

  async createSubscription(request: any): Promise<Subscription> {
    const model = this.create({
      user: request.customerId,
      stripe_customer_id: request.stripe_customer_id,
      stripe_subscription_id: request.id,
      stripe_plan_id: request.product_id,
      stripe_price_id: request.price_id,
      start_date: request.start_date,
      end_date: request.end_date,
      status: request.end_date,
      response: request,
      // created_at: request.created_at,
    });

    const subscription = await this.save(model);
    return subscription;
  }

  async getUserSubscriptions(user: string): Promise<Subscription> {
    const subscription = await this.findOne({
      where: { user },
      order: { id: 'DESC' },
    });

    if (!subscription) {
      return null;
    }
    return subscription;
  }
}
