import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../modules/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: 'antenna-top-secret-2022-till-date',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(request: JwtPayload): Promise<any> {
    const user = await this.userService.getUserByEmail(request.email_address);

    if (!user) {
      throw new UnauthorizedException('User unauthorized. Please login.');
    }

    return user;
  }
}
