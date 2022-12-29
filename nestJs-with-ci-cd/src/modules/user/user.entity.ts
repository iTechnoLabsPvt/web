import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntityProperties } from '../../shared/classes/common-entity-properties.class';
import { JsonStorage } from '../data-store/json-storage.entity';
import { Member } from '../member/member.entity';
import { IndividualMetric } from '../metrics/individual-metrics.entity';
import { RegistrationStage } from './enums/registration-stages.enum';

@Entity()
export class User extends CommonEntityProperties {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email_address: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  department: string;

  @Column({ default: 0 })
  no_of_employees: number;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  google_refresh_token: string;

  @Column({ nullable: true })
  google_access_token: string;

  @Column({ nullable: true })
  google_scopes: string;

  @Column()
  google_user_id: string;

  @Column({ default: RegistrationStage.GOOGLE_COMPLETE })
  progress: RegistrationStage;

  @Column({ type: 'text', nullable: true })
  picture: string;

  @Column({ nullable: true })
  slack_access_token: string;

  @Column({ nullable: true })
  stripe_customer_id: string;

  @Column({ default: false })
  initial_google_calendar_metrics_computed: boolean;

  @Column({ default: false })
  initial_google_mail_metrics_computed: boolean;

  @Column({ default: false })
  initial_slack_metrics_computed: boolean;

  @Column({ nullable: true })
  slack_user_id: string;

  @Column({ default: false })
  agree_terms_and_conditions: boolean;

  @OneToMany(() => Member, (member) => member.user, {
    nullable: true,
    eager: true,
  })
  members: Member[];

  @OneToMany(() => IndividualMetric, (metric) => metric.user, {
    nullable: true,
  })
  metrics: IndividualMetric[];

  @OneToMany(() => JsonStorage, (storage) => storage.user, {
    nullable: true,
  })
  json_storage: JsonStorage[];

  @Column({ nullable: true })
  last_login_date: Date;
}
