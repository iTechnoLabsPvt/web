export interface JwtPayload {
  email_address: string;
  first_name: string;
  last_name?: string;
  industry: string;
  department: string;
  google_user_id: string;
  picture: string;
}
