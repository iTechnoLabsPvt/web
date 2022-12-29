import { PercentageChangeEnum } from '../../statistics/enums/percentage-change.enum';

export interface TrendsResponse {
  team_size?: number | 0;
  average_team_member_tenure?: string;
  team_metric_trends?: TeamTrends;
  individual_metric_trends?: IndividualTrends;
}

export interface TeamTrends {
  average_weekly_time?: TrendsMetric;
  average_weekly_activities?: TrendsMetric;
}

export interface IndividualTrends {
  overall_exposure?: TrendsMetric;
  one_on_one_time?: TrendsMetric;
  overall_interactions?: TrendsMetric;
  one_on_one_interactions?: TrendsMetric;
}

export interface TrendsMetric {
  initial_90_days?: number | 0;
  last_90_days?: TrendMetricBody;
  last_week?: TrendMetricBody;
}

export interface TrendMetricBody {
  total?: number | 0;
  percentage_change?: string | '-';
  type?: PercentageChangeEnum;
}
