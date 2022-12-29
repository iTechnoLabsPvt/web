import { Controller, Get, Post, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import {
  SubscriptionDetailDTO,
  SubscriptionDTO,
} from './dto/create-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('/fetch-stripe-plans')
  async fetchStripePlans(): Promise<any> {
    return this.subscriptionService.fetchStripePlans();
  }

  @Post('/create-subscription')
  async createSubscription(@Body() request: SubscriptionDTO): Promise<any> {
    return this.subscriptionService.createSubscription(request);
  }

  @Get('/subscription-detail')
  async subscriptionDetail(
    @Body() request: SubscriptionDetailDTO,
  ): Promise<any> {
    return this.subscriptionService.subscriptionDetail(request);
  }
}
