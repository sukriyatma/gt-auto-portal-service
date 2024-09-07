import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notifications } from 'src/common/models/notifications.model';

@Module({
  imports: [SequelizeModule.forFeature([Notifications])],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
