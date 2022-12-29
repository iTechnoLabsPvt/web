import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MemberModule } from './modules/member/member.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { JsonStorageModule } from './modules/data-store/json-storage.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrendsModule } from './modules/trends/trends.module';
import { HooksModule } from './modules/hooks/hooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // entities: entities, // TODO: implement this later (just uncomment this line and comment the autoload entities portion)
        synchronize: true, // TODO: set this to false when going to production
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: +process.env.DB_PORT,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   // entities: entities, // TODO: implement this later (just uncomment this line and comment the autoload entities portion)
    //   synchronize: true, // TODO: set this to false when going to production
    //   autoLoadEntities: true,
    // }),
    UserModule,
    MemberModule,
    AuthenticationModule,
    MetricsModule,
    StatisticsModule,
    TrendsModule,
    HooksModule,
    JsonStorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
