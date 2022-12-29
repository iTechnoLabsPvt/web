import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../modules/user/user.repository';
import { UserModule } from '../modules/user/user.module';
import { ExternalModule } from '../shared/external/external.module';
import { HttpModule } from '@nestjs/axios';
import { SubscriptionModule } from '../modules/subscription/subscription.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'antenna-top-secret-2022-till-date',
      signOptions: {
        expiresIn: 18000,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
    ExternalModule,
    HttpModule,
    SubscriptionModule,
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController],
  exports: [JwtStrategy, AuthenticationService, PassportModule],
})
export class AuthenticationModule {}
