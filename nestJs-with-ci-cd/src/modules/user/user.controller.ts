import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../../authentication/decorators/authorized-user.decorator';
import { AuthorizationCodeDTO } from '../../shared/external/google/dtos/authorization-code.dto';
import { AddMembersDTO } from './dtos/create-user.dto';
import { UserProfileResponse } from './interfaces/responses/user-profile.interface';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup/start')
  async createAccount(@Body() request: AuthorizationCodeDTO): Promise<any> {
    return this.userService.createAccount(request);
  }

  @Post('/signup/members/create')
  async createMembers(@Body() request: AddMembersDTO): Promise<any> {
    return this.userService.createMembers(request);
  }

  @Post('/slack/authorize')
  async authorizeSlack(@Body() request: AuthorizationCodeDTO): Promise<any> {
    return this.userService.authorizeSlack(request);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getUserProfile(
    @AuthenticatedUser() auth_user: User,
  ): Promise<UserProfileResponse> {
    return await this.userService.getUserProfile(auth_user);
  }
  
}
