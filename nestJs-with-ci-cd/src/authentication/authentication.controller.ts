import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RedirectUrlType } from '../shared/external/google/enums/redirect-url-type.enum';
import { GoogleService } from '../shared/external/google/google.service';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dtos/login.dto';
import { LoginResponse } from './interfaces/login-response.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private googleService: GoogleService,
  ) {}

  @Post('/login')
  login(@Body() request: LoginDTO): Promise<LoginResponse> {
    return this.authenticationService.login(request);
  }

  @Get('/google/url/:type')
  generateAuthUrl(@Param('type') type: RedirectUrlType): any {
    return this.googleService.generateAuthUrl(type);
  }
}
