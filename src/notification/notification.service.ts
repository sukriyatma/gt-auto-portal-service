import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { BotActivity } from 'src/common/consts/bot-activity.const';
import { BotStatus } from 'src/common/consts/bot-status.const';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { ReadNotificationDto } from 'src/common/dto/read-notification.dto';
import { Notifications } from 'src/common/models/notifications.model';
import * as firebaseAdmin from 'firebase-admin';
import { Users } from 'src/common/models/users.model';
import { Groups } from 'src/common/models/groups.model';
import { Bots } from 'src/common/models/bots.model';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import configuration from 'src/common/config/configuration';
import { GetNotificationsParamsDto } from 'src/common/dto/get-notifications-params.dto';
import { PaginationBaseDto } from 'src/common/dto/pagination-base.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Injectable()
export class NotificationService {

    constructor(
        @InjectModel(Notifications)
        private readonly notificationsModel: typeof Notifications
    ) {}

    async create(data: CreateNotificationDto): Promise<void> {
        
        if (data.type === BotStatus.DISCONNECTED) 
            this.notifyDisconnected(data.user, data.group, data.bot);

        if (data.type === BotStatus.SUSPENDED) {
            this.notifySuspended(data.user, data.group, data.bot);
        }

        if (data.type === BotActivity.FOUND_NUKED_WORLD) {
            this.notifyNukedWorld(data.user, data.group, data.bot);
        }
        
    }

    async getList(query: GetNotificationsParamsDto, user: Users): Promise<ApiResponseDto<PaginationBaseDto<Notifications[]>>> {

        const whereClause = {
            fkUserId: user.userId
        }

        if (query.next) {
            whereClause["createdAt"] = {
                [Op.lte] : this.notificationsModel.sequelize.literal(`(SELECT "createdAt" from "${this.notificationsModel.tableName}" where "notificationId" = '${query.next}')`) 
            }
            whereClause["notificationId"] = {
                [Op.ne] : query.next
            }
        }

        const notifications: Notifications[] = await this.notificationsModel.findAll({
            where: whereClause,
            order : [
                ["createdAt", "DESC"]
            ],
            limit: 5
        });

        const paginationBase: PaginationBaseDto<Notifications[]> = new PaginationBaseDto();
        paginationBase.data = notifications;
        paginationBase.pagination = new PaginationDto(notifications.at(notifications.length-1)?.notificationId)

        return ApiResponseDto.success(paginationBase);
    }

    async read(user: Users, req: ReadNotificationDto): Promise<ApiResponseDto<void>> {

        const whereClause = {
            fkUserId: user.userId,
            readAt: null
        }
        if (req.id) {
            whereClause['notificationId'] = req.id;
        }
        
        const now = new Date().getTime();
        const [affectedCount]: [number] = await this.notificationsModel.update({
            readAt: now,
            updatedAt: now 
        },
        {
            where: whereClause
        })

        if (affectedCount === 0 && req.id) {
            await this.notificationsModel.update({
                readAt: null,
                updatedAt: now 
            },
            {
                where: {
                    fkUserId: user.userId,
                    notificationId: req.id
                }
            })  
        }
        return ApiResponseDto.success(null);
    }


    private async notifyDisconnected(user: Users, group: Groups, bot: Bots): Promise<void> {
        const title = "Bot Disconnected";
        const description = `Your bot '${bot.name}' has been disconnected`;
        const data = this.toNotifications(BotStatus.DISCONNECTED, title, description, user, group, bot, new Date().getTime());

        const notif :Notifications = await this.notificationsModel.create(data)
        this.sendNotificationToUser(user.fcmToken, notif);
    }

    private async notifySuspended(user: Users, group: Groups, bot: Bots): Promise<void> {
        const title = "Bot Suspended";
        const description = `Your bot '${bot.name}' has been suspended`;
        const data = this.toNotifications(BotStatus.SUSPENDED, title, description, user, group, bot, new Date().getTime());

        const notif :Notifications = await this.notificationsModel.create(data)
        this.sendNotificationToUser(user.fcmToken, notif);
    }

    private async notifyNukedWorld(user: Users, group: Groups, bot: Bots): Promise<void> {
        const title = "World Nuked Found";
        const description = `Your world '${bot.world}' has been found nuked by'${bot.name}'`;
        const data = this.toNotifications(BotActivity.FOUND_NUKED_WORLD, title, description, user, group, bot, new Date().getTime());

        const notif :Notifications = await this.notificationsModel.create(data)
        this.sendNotificationToUser(user.fcmToken, notif);
    }

    private async sendNotificationToUser(token: string, notifData: Notifications) {
        
        if (!token) {
            console.info(`fcmToken from account '${notifData.fkUserId}' doesn't exist`)
            return;
        }

        firebaseAdmin.messaging().send({
            token: token,
            data: {
                url: `${configuration().frontendUrl}/monitoring/group/${notifData.fkGroupId}`,
                readAt: notifData.readAt + "",
                createdAt: notifData.createdAt + "",
                botId: notifData.fkBotId,
                groupId: notifData.fkGroupId,
                userId: notifData.fkUserId,
                type: notifData.type,
                id: notifData.notificationId,
                title: notifData.title,
                body: notifData.description,
                icon: `${configuration().frontendUrl}/favicon.ico`
            },          
        }).then(res => console.log("Success send notification :", res))
        .catch(err => console.error("Error occure when send notification", err))
    }

    private toNotifications(
        type: BotStatus| BotActivity,
        title: string,
        description: string,
        user: Users, 
        group: Groups, 
        bot: Bots,
        createdAt?: number | null,
        updateAt?: number | null,
        readAt?: number | null
    ) {
        return {
            type: type,
            fkBotId: bot.botId,
            fkGroupId: group.groupId,
            fkUserId: user.userId,
            title: title,
            description: description,
            createdAt: createdAt,
            updateAt: updateAt,
            readAt: readAt
        }
    }

}
