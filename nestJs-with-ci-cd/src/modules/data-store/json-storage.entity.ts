import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntityProperties } from '../../shared/classes/common-entity-properties.class';
import { MetricType } from '../metrics/enums/metric-type.enum';
import { User } from '../user/user.entity';
import { DataStoreFrequencyType } from './enums/data-store-frequency.enum';

@Entity()
export class JsonStorage extends CommonEntityProperties {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ default: DataStoreFrequencyType.WEEKLY })
  type: DataStoreFrequencyType;

  @Column({ nullable: true })
  metric_type: MetricType;

  @Column({ type: 'text' })
  json: string;

  @ManyToOne(() => User, (user) => user.json_storage, {
    nullable: true,
  })
  user: User;
}
