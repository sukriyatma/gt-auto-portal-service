import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Groups } from 'src/common/models/groups.model';
import { Bots } from 'src/common/models/bots.model';
import { Users } from 'src/common/models/users.model';
import { Notifications } from 'src/common/models/notifications.model';
import { NotificationService } from 'src/notification/notification.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Users, Groups, Bots, Notifications])
    ],
    providers: [
        DataService,
        NotificationService
    ],
    controllers: [DataController]
})
export class DataModule {}
