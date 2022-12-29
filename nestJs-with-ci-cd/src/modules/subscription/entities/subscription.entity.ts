import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntityProperties } from '../../../shared/classes/common-entity-properties.class';

@Entity()
export class Subscription extends CommonEntityProperties {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true, default: null })
  user_id: string;

  @Column({ nullable: true, default: null })
  stripe_customer_id: string;

  @Column({ nullable: true, default: null })
  stripe_subscription_id: string;

  @Column({ nullable: true, default: null })
  stripe_plan_id: string;

  @Column({ nullable: true, default: null })
  stripe_price_id: string;

  @Column({ nullable: true, default: null })
  price: string;

  @Column({ nullable: true, default: null })
  discount: string;

  @Column({ nullable: true, default: null })
  start_date: string;

  @Column({ nullable: true, default: null })
  end_date: string;

  @Column({ nullable: true, default: null })
  cancel_date: string;

  @Column({
    type: 'enum',
    enum: ['Payment Pending', 'Completed', 'Cancelled'],
    nullable: true,
    default: null,
  })
  status: string;

  @Column({ nullable: true, default: null })
  response: string;

  @Column({ nullable: true, default: null })
  cancel_response: string;
}
