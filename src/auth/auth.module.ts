import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/common/models/users.model';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";
import { GAPLoggerService } from 'src/common/utils/logger.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '7d'} // 7 days
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GAPLoggerService
  ]
})
export class AuthModule {}
