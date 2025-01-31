import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { randomUUID } from 'crypto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { CreateDataReqDto } from 'src/common/dto/create-data.dto';
import { UserDetails } from 'src/common/dto/user-details';
import { Bots } from 'src/common/models/bots.model';
import { Groups } from 'src/common/models/groups.model';
import { Users } from 'src/common/models/users.model';
import { GAPLoggerService } from 'src/common/utils/logger.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class DataService{

    constructor(
        @InjectModel(Users)
        private readonly usersModel: typeof Users,
        
        @InjectModel(Groups)
        private readonly groupsModel: typeof Groups,
       
        @InjectModel(Bots)
        private readonly botsModel: typeof Bots,

        @Inject(NotificationService)
        private notificationService: NotificationService,

        @Inject(GAPLoggerService)
        private readonly logger: GAPLoggerService

    ){}

    async create(req: CreateDataReqDto, user: Users): Promise<ApiResponseDto<void>> {

        const now: number = new Date().getTime();
        let [groups, isGroupsCreated]: [Groups, boolean] = await this.groupsModel.findOrCreate({
            where: {
                name: req.groupName,
                fkUserId: user.userId,
                deletedAt: null
            },
            defaults: {
                name: req.groupName,
                fkUserId: user.userId,
                ip: req.ip,
                cpuPercentage: req.cpuPercentage,
                ramPercentage: req.ramPercentage,
                createdAt: now,
                updatedAt: now
            }
        })

        // if the data exist, then updated it
        if (!isGroupsCreated) {
            this.logger.log("Group is existed, and update it", this)
            groups = await groups.update({
                ip: req.ip,
                cpuPercentage: req.cpuPercentage,
                ramPercentage: req.ramPercentage,
                updatedAt: now
            })
        }

        const [bots, isBotsCreated]: [Bots, boolean] = await this.botsModel.findOrCreate({
            where: {
                name: req.bot.name,
                fkGroupId: groups.groupId,
                deletedAt: null
            },
            defaults: {
                fkGroupId: groups.groupId,
                name: req.bot.name,
                lvl: req.bot.lvl,
                world: req.bot.world,
                status: req.bot.status,
                gems: req.bot.gems,
                createdAt: now,
                updatedAt: now
            }
        })

        if (!isBotsCreated) {
            await bots.update({
                lvl: req.bot.lvl,
                world: req.bot.world,
                status: req.bot.status,
                gems: req.bot.gems,
                updatedAt: now
            })
        }

        // Send notification to users
        this.notificationService.create({
            bot: bots,
            group: groups,
            user: user,
            type: req.bot.activity ?? req.bot.status
        });
        return ApiResponseDto.success(null);
    }

}
