export interface UserProfileResponse {
  basic_information: BasicInformation;
  team_information: TeamMember[];
  subscription_information?: SubscriptionInformation;
}

export interface BasicInformation {
  avatar?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email_address?: string | null;
  number_of_employees?: number | null;
  industry?: string | null;
  department?: string | null;
  google_permission_granted?: boolean | null;
  slack_permission_granted?: boolean | null;
}

export interface TeamMember {
  title?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email_address?: string | null;
  department?: string | null;
  start_date?: string | null;
  tenure?: string | null;
}

export interface SubscriptionInformation {
  signup_date?: string | null;
  current_subscription?: string | null;
  renewal_date?: string | null;
}
