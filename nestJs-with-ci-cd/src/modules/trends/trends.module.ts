import { Module } from '@nestjs/common';
import { MemberModule } from '../member/member.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';

@Module({
  imports: [MemberModule, StatisticsModule],
  controllers: [TrendsController],
  providers: [TrendsService],
  exports: [TrendsService],
})
export class TrendsModule {}
