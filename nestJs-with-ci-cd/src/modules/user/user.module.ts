import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserSubscription } from './subscription.repository';
import { ExternalModule } from '../../shared/external/external.module';
import { MemberModule } from '../member/member.module';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MemberModule,
    ExternalModule,
    forwardRef(() => MetricsModule),
  ],
  providers: [UserService, UserRepository, UserSubscription],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
