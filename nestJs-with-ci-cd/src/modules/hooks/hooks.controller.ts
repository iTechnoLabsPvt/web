import { Controller, Get, Headers, Post } from '@nestjs/common';
import { Helpers } from '../../shared/helpers/helper.class';
import { ComputationTypeEnum } from '../metrics/enums/computation-type.enum';
import { MetricsService } from '../metrics/metrics.service';

@Controller('hooks')
export class HooksController {
  constructor(private metricsService: MetricsService) {}

  @Get('compute/calendar/weekly')
  async computeCalendarWeeklyMetrics(): Promise<void> {
    console.log('working calendar');
    return await this.metricsService.computeWeeklyMetrics(
      ComputationTypeEnum.COMPUTE_CALENDAR,
    );
  }

  @Get('compute/mail/weekly')
  async computeGmailWeeklyMetrics(): Promise<void> {
    return await this.metricsService.computeWeeklyMetrics(
      ComputationTypeEnum.COMPUTE_GMAIL,
    );
  }

  @Get('compute/slack/weekly')
  async computeSlackWeeklyMetrics(): Promise<void> {
    return await this.metricsService.computeWeeklyMetrics(
      ComputationTypeEnum.COMPUTE_SLACK,
    );
  }

  @Get('compute/calendar/initial')
  async computeCalendarInitialMetrics(): Promise<void> {
    return await this.metricsService.computeMetricsForThePast90Days(
      ComputationTypeEnum.COMPUTE_CALENDAR,
    );
  }

  @Get('compute/mail/initial')
  async computeGmailInitialMetrics(): Promise<void> {
    return await this.metricsService.computeMetricsForThePast90Days(
      ComputationTypeEnum.COMPUTE_GMAIL,
    );
  }

  @Get('compute/slack/initial')
  async computeSlackInitialMetrics(): Promise<void> {
    return await this.metricsService.computeMetricsForThePast90Days(
      ComputationTypeEnum.COMPUTE_SLACK,
    );
  }

  @Get('help')
  async migrateDates(): Promise<string> {
    const first = 'Christopherss Ikupa James';
    const last = 'Christopherss Ikupa James';
    return Helpers.formatFullName(first, last);
    // return await this.metricsService.migrate();
  }
}
