import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Helpers } from '../../shared/helpers/helper.class';
import { PercentageChange } from '../../shared/interfaces/percentage-change.interface';
import { Member } from '../member/member.entity';
import {
  MainMetricsType,
  MetricsCalculationType,
  MetricsType,
} from '../statistics/enums/statistics-type.enum';
import { StatisticsService } from '../statistics/statistics.service';
import { User } from '../user/user.entity';
import { TrendMetricsType } from './enums/trend-metrics-type.enum';
import { TrendsResponse } from './interfaces/trends-response.interface';

@Injectable()
export class TrendsService {
  constructor(private statisticsService: StatisticsService) {}

  async getTrends(auth_user: User): Promise<TrendsResponse> {
    const team_size = auth_user.members.length;
    const average_team_member_tenure = this.getAverageTeamMemberTenure(
      auth_user.members,
    );
    const one_on_one_interactions_initial_90_days =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.ENGAGEMENTS,
        MetricsCalculationType.ONE_TO_ONE_TIME,
        TrendMetricsType.INITIAL_90,
        MainMetricsType.INDIVIDUAL,
      );

    const one_on_one_interactions_last_90_days =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.ENGAGEMENTS,
        MetricsCalculationType.ONE_TO_ONE_TIME,
        TrendMetricsType.LAST_90,
        MainMetricsType.INDIVIDUAL,
      );

    const one_on_one_interactions_last_week = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.ENGAGEMENTS,
      MetricsCalculationType.ONE_TO_ONE_TIME,
      TrendMetricsType.LAST_WEEK,
      MainMetricsType.INDIVIDUAL,
    );

    const last_90_days_interactions_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        one_on_one_interactions_initial_90_days,
        one_on_one_interactions_last_90_days,
      );

    const last_week_interactions_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        one_on_one_interactions_initial_90_days,
        one_on_one_interactions_last_week,
      );

    const one_on_one_time_initial_90_days = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.HOURS,
      MetricsCalculationType.ONE_TO_ONE_TIME,
      TrendMetricsType.INITIAL_90,
      MainMetricsType.INDIVIDUAL,
    );

    const one_on_one_time_last_90_days = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.HOURS,
      MetricsCalculationType.ONE_TO_ONE_TIME,
      TrendMetricsType.LAST_90,
      MainMetricsType.INDIVIDUAL,
    );

    const one_on_one_time_last_week = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.HOURS,
      MetricsCalculationType.ONE_TO_ONE_TIME,
      TrendMetricsType.LAST_WEEK,
      MainMetricsType.INDIVIDUAL,
    );

    const last_90_days_time_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        one_on_one_time_initial_90_days,
        one_on_one_time_last_90_days,
      );

    const last_week_time_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        one_on_one_time_initial_90_days,
        one_on_one_time_last_week,
      );

    const overall_exposure_initial_90_days = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.HOURS,
      MetricsCalculationType.OVERALL_TIME,
      TrendMetricsType.INITIAL_90,
      MainMetricsType.INDIVIDUAL,
    );

    const overall_exposure_last_90_days = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.HOURS,
      MetricsCalculationType.OVERALL_TIME,
      TrendMetricsType.LAST_90,
      MainMetricsType.INDIVIDUAL,
    );

    const overall_exposure_last_week = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.HOURS,
      MetricsCalculationType.OVERALL_TIME,
      TrendMetricsType.LAST_WEEK,
      MainMetricsType.INDIVIDUAL,
    );

    const last_90_days_overall_exposure_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        overall_exposure_initial_90_days,
        overall_exposure_last_90_days,
      );

    const last_week_overall_exposure_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        overall_exposure_initial_90_days,
        overall_exposure_last_week,
      );

    const overall_interactions_initial_90_days =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.ENGAGEMENTS,
        MetricsCalculationType.OVERALL_TIME,
        TrendMetricsType.INITIAL_90,
        MainMetricsType.INDIVIDUAL,
      );

    const overall_interactions_last_90_days = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.ENGAGEMENTS,
      MetricsCalculationType.OVERALL_TIME,
      TrendMetricsType.LAST_90,
      MainMetricsType.INDIVIDUAL,
    );

    const overall_interactions_last_week = await this.getTrendMetricsAverage(
      auth_user,
      MetricsType.ENGAGEMENTS,
      MetricsCalculationType.OVERALL_TIME,
      TrendMetricsType.LAST_WEEK,
      MainMetricsType.INDIVIDUAL,
    );

    const last_90_days_overall_interactions_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        overall_interactions_initial_90_days,
        overall_interactions_last_90_days,
      );

    const last_week_overall_interactions_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        overall_interactions_initial_90_days,
        overall_interactions_last_week,
      );

    const average_weekly_team_time_initial_90_days =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.HOURS,
        MetricsCalculationType.TEAM_TIME,
        TrendMetricsType.INITIAL_90,
        MainMetricsType.TEAM,
      );

    const average_weekly_team_time_last_90_days =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.HOURS,
        MetricsCalculationType.TEAM_TIME,
        TrendMetricsType.LAST_90,
        MainMetricsType.TEAM,
      );

    const average_weekly_team_time_last_week =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.HOURS,
        MetricsCalculationType.TEAM_TIME,
        TrendMetricsType.LAST_WEEK,
        MainMetricsType.TEAM,
      );

    const last_90_days_average_weekly_team_time_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        average_weekly_team_time_initial_90_days,
        average_weekly_team_time_last_90_days,
      );

    const last_week_average_weekly_team_time_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        average_weekly_team_time_initial_90_days,
        average_weekly_team_time_last_week,
      );

    const average_weekly_team_activities_initial_90_days =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.ENGAGEMENTS,
        MetricsCalculationType.TEAM_TIME,
        TrendMetricsType.INITIAL_90,
        MainMetricsType.TEAM,
      );

    const average_weekly_team_activities_last_90_days =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.ENGAGEMENTS,
        MetricsCalculationType.TEAM_TIME,
        TrendMetricsType.LAST_90,
        MainMetricsType.TEAM,
      );

    const average_weekly_team_activities_last_week =
      await this.getTrendMetricsAverage(
        auth_user,
        MetricsType.ENGAGEMENTS,
        MetricsCalculationType.TEAM_TIME,
        TrendMetricsType.LAST_WEEK,
        MainMetricsType.TEAM,
      );

    const last_90_days_average_weekly_team_activities_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        average_weekly_team_activities_initial_90_days,
        average_weekly_team_activities_last_90_days,
      );

    const last_week_average_weekly_team_activities_percentage_change: PercentageChange =
      Helpers.getPercentageChange(
        average_weekly_team_activities_initial_90_days,
        average_weekly_team_activities_last_week,
      );

    // individual
    const response: TrendsResponse = {
      team_size: team_size,
      average_team_member_tenure: average_team_member_tenure,
      individual_metric_trends: {
        one_on_one_interactions: {
          initial_90_days: one_on_one_interactions_initial_90_days ?? 0,
          last_90_days: {
            type: last_week_interactions_percentage_change.type,
            percentage_change: last_week_interactions_percentage_change.percent,
            total: one_on_one_interactions_last_90_days,
          },
          last_week: {
            type: last_90_days_interactions_percentage_change.type,
            percentage_change:
              last_90_days_interactions_percentage_change.percent,
            total: one_on_one_interactions_last_week,
          },
        },
        one_on_one_time: {
          initial_90_days: one_on_one_time_initial_90_days,
          last_90_days: {
            type: last_90_days_time_percentage_change.type,
            percentage_change: last_90_days_time_percentage_change.percent,
            total: one_on_one_time_last_90_days,
          },
          last_week: {
            type: last_week_time_percentage_change.type,
            percentage_change: last_week_time_percentage_change.percent,
            total: one_on_one_time_last_week,
          },
        },
        overall_exposure: {
          initial_90_days: overall_exposure_initial_90_days,
          last_90_days: {
            type: last_90_days_overall_exposure_percentage_change.type,
            percentage_change:
              last_90_days_overall_exposure_percentage_change.percent,
            total: overall_exposure_last_90_days,
          },
          last_week: {
            type: last_week_overall_exposure_percentage_change.type,
            percentage_change:
              last_week_overall_exposure_percentage_change.percent,
            total: overall_exposure_last_week,
          },
        },
        overall_interactions: {
          initial_90_days: overall_interactions_initial_90_days,
          last_90_days: {
            type: last_90_days_overall_interactions_percentage_change.type,
            percentage_change:
              last_90_days_overall_interactions_percentage_change.percent,
            total: overall_interactions_last_90_days,
          },
          last_week: {
            type: last_week_overall_interactions_percentage_change.type,
            percentage_change:
              last_week_overall_interactions_percentage_change.percent,
            total: overall_interactions_last_week,
          },
        },
      },
      team_metric_trends: {
        average_weekly_time: {
          initial_90_days: average_weekly_team_time_initial_90_days,
          last_90_days: {
            percentage_change:
              last_90_days_average_weekly_team_time_percentage_change.percent,
            total: average_weekly_team_time_last_90_days,
            type: last_90_days_average_weekly_team_time_percentage_change.type,
          },
          last_week: {
            percentage_change:
              last_week_average_weekly_team_time_percentage_change.percent,
            total: average_weekly_team_time_last_week,
            type: last_week_average_weekly_team_time_percentage_change.type,
          },
        },
        average_weekly_activities: {
          initial_90_days: average_weekly_team_activities_initial_90_days,
          last_90_days: {
            percentage_change:
              last_90_days_average_weekly_team_activities_percentage_change.percent,
            total: average_weekly_team_activities_last_90_days,
            type: last_90_days_average_weekly_team_activities_percentage_change.type,
          },
          last_week: {
            percentage_change:
              last_week_average_weekly_team_activities_percentage_change.percent,
            total: average_weekly_team_activities_last_week,
            type: last_week_average_weekly_team_activities_percentage_change.type,
          },
        },
      },
    };
    return response;
  }

  getAverageTeamMemberTenure(members: Member[]): string {
    const start_date = moment();
    const members_start_month_and_year: number = members
      .map((x) => start_date.diff(moment(x.start_date), 'days'))
      .reduce((a, b) => a + b, 0);

    const average_days = Math.round(
      members_start_month_and_year / members.length,
    );

    const end_date = moment().add(average_days, 'days');

    const years = end_date.diff(start_date, 'year');
    start_date.add(years, 'years');

    const months = end_date.diff(start_date, 'months');
    start_date.add(months, 'months');

    return `${years} years ${months} months`;
  }

  async getTrendMetricsAverage(
    auth_user: User,
    type: MetricsType,
    calculation_type: MetricsCalculationType,
    trend_metrics_type: TrendMetricsType,
    main_metric_type: MainMetricsType,
  ): Promise<number> {
    let initial_date;
    if (trend_metrics_type === TrendMetricsType.INITIAL_90) {
      initial_date = moment(auth_user.createdAt);
    } else if (
      trend_metrics_type === TrendMetricsType.LAST_90 ||
      trend_metrics_type === TrendMetricsType.LAST_WEEK
    ) {
      initial_date = moment();
    }
    const start_week: number = initial_date
      .clone()
      .subtract(1, 'week')
      .endOf('week')
      .week();

    const start_year: number = initial_date
      .clone()
      .subtract(1, 'week')
      .endOf('week')
      .year();

    let average = 0;
    if (trend_metrics_type === TrendMetricsType.LAST_WEEK) {
      average = await this.statisticsService.calculateLastWeeksAverage(
        auth_user,
        type,
        calculation_type,
        main_metric_type,
      );
    } else {
      average =
        await this.statisticsService.calculateThirteenWeeksMovingAverage(
          auth_user,
          start_week,
          start_year,
          type,
          calculation_type,
          main_metric_type,
        );
    }

    return +average.toFixed(2);
  }
}
