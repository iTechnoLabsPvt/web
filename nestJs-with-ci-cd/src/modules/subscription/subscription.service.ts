import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import {
  CreateSubscriptionDto,
  SubscriptionDetailDTO,
  SubscriptionDTO,
} from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private usersRepository: Repository<Subscription>,
  ) {}

  async fetchStripePlans(): Promise<Object> {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list();
    return prices;
  }

  async createSubscription(datas: SubscriptionDTO): Promise<Object> {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    /* CREATE SOURCE TOKEN*/
    const source = await stripe.sources.create({
      token: datas.token,
      type: 'card',
    });

    /* UPDATE CUSTOMER SOURCE*/
    const customer = await stripe.customers.update(datas.stripe_customer_id, {
      source: source.id,
    });

    /*CREATE SUBSCRIPTION*/
    const subscription = await stripe.subscriptions.create({
      customer: datas.stripe_customer_id,
      items: [{ price: datas.stripe_price_id }],
    });

    const request = new CreateSubscriptionDto();

    request.user_id = datas.user_id;
    request.stripe_customer_id = datas.stripe_customer_id;
    request.stripe_plan_id = subscription.plan.product;
    request.stripe_price_id = subscription.plan.id;
    request.start_date = moment
      .unix(subscription.current_period_start)
      .format('YYYY-MM-DD');
    request.end_date = moment
      .unix(subscription.current_period_end)
      .format('YYYY-MM-DD');
    request.status =
      subscription.status === 'active' ? 'Completed' : 'Payment Pending';
    request.response = subscription;

    const subscriptionCreated = await this.usersRepository.create(request);
    const response = await this.usersRepository.save(subscriptionCreated);

    const model: any = {
      id: +response.id,
      message: 'You have successfully subscribed.',
    };

    return model;
  }

  async subscriptionDetail(request: SubscriptionDetailDTO): Promise<Object> {
    const subscription = await this.usersRepository.find({
      where: {
        user_id: request.user_id,
      },
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    return subscription;
  }
}
