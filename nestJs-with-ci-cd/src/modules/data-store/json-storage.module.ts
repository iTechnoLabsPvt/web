import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { JsonStorage } from './json-storage.entity';
import { JsonStorageRepository } from './json-storage.repository';
import { JsonStorageService } from './json-storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JsonStorage]),
    forwardRef(() => UserModule),
  ],
  providers: [JsonStorageService, JsonStorageRepository],
  exports: [JsonStorageService],
})
export class JsonStorageModule {}
