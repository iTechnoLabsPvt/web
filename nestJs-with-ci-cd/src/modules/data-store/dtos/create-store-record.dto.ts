import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MetricType } from '../../metrics/enums/metric-type.enum';
import { DataStoreFrequencyType } from '../enums/data-store-frequency.enum';

export class CreateStoreRecordDTO {
  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  @IsEnum(DataStoreFrequencyType)
  type?: DataStoreFrequencyType;

  @IsNotEmpty()
  @IsEnum(MetricType)
  metric_type: MetricType;

  @IsNotEmpty()
  @IsEmail()
  user_email: string;

  @IsNotEmpty()
  @IsString()
  json: string;
}
