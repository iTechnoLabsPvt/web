export interface LoginResponse {
  access_token: string;
  first_name: string;
  last_name?: string;
  picture: string;
  industry: string;
  department: string;
  subscription: object;
}
