import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { DataModule } from './data/data.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { Users } from './common/models/users.model';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './firebase/firebase.module';
import configuration from './common/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.databaseName,
      autoLoadModels: true,
      synchronize: true
    }),
    DataModule,
    NotificationModule,
    AuthModule,
    SequelizeModule.forFeature([Users]),
    UserModule,
    FirebaseModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ]
})
export class AppModule {}
