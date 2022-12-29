import { Module } from '@nestjs/common';
import { MetricsModule } from '../metrics/metrics.module';
import { HooksController } from './hooks.controller';

@Module({
  imports: [MetricsModule],
  controllers: [HooksController],
})
export class HooksModule {}
