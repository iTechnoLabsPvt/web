import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { JsonStorage } from './json-storage.entity';
import { CreateStoreRecordDTO } from './dtos/create-store-record.dto';
import { User } from '../user/user.entity';

@Injectable()
export class JsonStorageRepository extends Repository<JsonStorage> {
  constructor(private dataSource: DataSource) {
    super(JsonStorage, dataSource.createEntityManager());
  }

  async createStoreRecord(
    request: CreateStoreRecordDTO,
    user: User,
  ): Promise<JsonStorage> {
    const model = this.create({
      start_date: request.start_date,
      end_date: request.end_date,
      type: request.type,
      user: user,
      json: request.json,
      metric_type: request.metric_type,
    });

    const record = await this.save(model);
    return record;
  }
}
