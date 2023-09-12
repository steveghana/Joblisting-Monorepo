import {
  Module,
  DynamicModule,
  CacheModule,
  Next,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  NestModule,
  Type,
} from '@nestjs/common/interfaces';
import { Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Modules } from './exports';
import * as path from 'path';
// import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { myDataSource } from '../../apps/Config';
import config from '../Config/config';
import { RedisCacheModule } from '../redis/redis.module';
import { CorsMiddleware } from '../middleware/cors.middleware';
// import { UserEntity } from '../auth/src/models/user.entity';
import dbConfiguration from '../Config/db.config';
import {
  AcceptLanguageResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { AuthMiddleware } from '../middleware/authenticated.middleware';
import { OptionalAuthMiddleware } from '../middleware/optionallyAuthenticated.middleware';
import { AuthenticationTtlMiddleware } from '../middleware/authenticationTtl.middleware';
@Module({
  imports: [
    CacheModule.register({
      ttl: 5,
      max: 100,
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [dbConfiguration],
    }),
    // database configuration goes here
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        myDataSource
          .initialize()
          .then(async () => {
            console.log('Data Source has been initialized!');
          })
          .catch((err) => {
            console.error('Error during Data Source initialization', err);
          });
        return {
          ...configService.get('database'),
        };
      },
      inject: [ConfigService],
    }),
    ...Modules,
  ],
  controllers: [],
  providers: [
    // AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthenticationTtlMiddleware,
    },
  ],
})
// export class AppModule {}
export class AppModule {}
