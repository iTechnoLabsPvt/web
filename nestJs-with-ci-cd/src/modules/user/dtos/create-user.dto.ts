import { IsNotEmpty } from 'class-validator';
import { CreateMemberDTO } from '../../member/dtos/create-member.dto';

export class CreateUserDTO {
  @IsNotEmpty()
  google_user_id: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  email_address: string;

  picture: string;

  google_refresh_token: string;

  google_access_token: string;
  google_scopes: string;
  stripe_customer_id: string;
}

export class AddMembersDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  industry: string;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  members: CreateMemberDTO[];
}
