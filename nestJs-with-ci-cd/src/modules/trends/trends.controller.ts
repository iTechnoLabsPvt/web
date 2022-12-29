import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../../authentication/decorators/authorized-user.decorator';
import { User } from '../user/user.entity';
import { TrendsResponse } from './interfaces/trends-response.interface';
import { TrendsService } from './trends.service';

@UseGuards(AuthGuard('jwt'))
@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Get('/')
  async getTrends(
    @AuthenticatedUser() auth_user: User,
  ): Promise<TrendsResponse> {
    return await this.trendsService.getTrends(auth_user);
  }
}
