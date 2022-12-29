import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JsonStorage } from './json-storage.entity';
import { JsonStorageRepository } from './json-storage.repository';
import { CreateStoreRecordDTO } from './dtos/create-store-record.dto';
import * as moment from 'moment';
import { DataStoreFrequencyType } from './enums/data-store-frequency.enum';

@Injectable()
export class JsonStorageService {
  constructor(
    private JsonStorageRepository: JsonStorageRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async createJsonStoreRecord(
    request: CreateStoreRecordDTO,
  ): Promise<JsonStorage> {
    const user = await this.userService.getUserByEmail(request.user_email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const difference_in_dates = moment(request.end_date).diff(
      moment(request.start_date),
      'weeks',
    );
    request.type =
      difference_in_dates > 1
        ? DataStoreFrequencyType.PAST_90_DAYS
        : DataStoreFrequencyType.WEEKLY;

    const record = await this.JsonStorageRepository.createStoreRecord(
      request,
      user,
    );
    return record;
  }
}
