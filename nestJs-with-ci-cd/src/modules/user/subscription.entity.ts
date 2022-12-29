import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { CommonEntityProperties } from '../../shared/classes/common-entity-properties.class';
import { User } from './user.entity';

@Entity()
export class Subscription extends CommonEntityProperties {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => User)
  user: string;

  @Column({ nullable: true })
  stripe_customer_id: string;

  @Column({ nullable: true })
  stripe_subscription_id: string;

  @Column({ nullable: true })
  stripe_plan_id: string;

  @Column({ nullable: true })
  stripe_price_id: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  discount: string;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  cancel_date: Date;

  @Column({
    type: 'enum',
    enum: ['Payment Pending', 'Completed', 'Cancelled'],
    nullable: true,
  })
  status: string;

  @Column({ nullable: true })
  response: JSON;

  @Column({ nullable: true })
  cancel_response: JSON;
}
