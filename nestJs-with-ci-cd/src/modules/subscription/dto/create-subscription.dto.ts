import { IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  stripe_customer_id: string;

  @IsNotEmpty()
  stripe_subscription_id: string;

  @IsNotEmpty()
  stripe_plan_id: string;

  @IsNotEmpty()
  stripe_price_id: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  discount: string;

  @IsNotEmpty()
  start_date: string;

  @IsNotEmpty()
  end_date: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  response: string;

  cancel_date: string;
  cancel_response: string;
}

export class SubscriptionDTO {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  stripe_customer_id: string;

  @IsNotEmpty()
  stripe_price_id: string;
}

export class SubscriptionDetailDTO {
  @IsNotEmpty()
  user_id: string;
}
