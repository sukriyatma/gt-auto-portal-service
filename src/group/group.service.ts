import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn, literal, Op, QueryTypes } from 'sequelize';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { BotsMeta } from 'src/common/dto/bots-meta.dto';
import { DeleteGroupReqDto } from 'src/common/dto/delete-group-req.dto';
import { GetBotDetailResDto } from 'src/common/dto/get-bot-detail-res.dto';
import { GetGroupDetailReqDto } from 'src/common/dto/get-group-detail-res.dto';
import { GetGroupsParamsDto } from 'src/common/dto/get-groups-params.dto';
import { GetGroupsResDto } from 'src/common/dto/get-groups-res.dto';
import { Bots } from 'src/common/models/bots.model';
import { GroupsAndBots } from 'src/common/models/groups-and-bots.model';
import { Groups } from 'src/common/models/groups.model';
import { Users } from 'src/common/models/users.model';

@Injectable()
export class GroupService {

    constructor (
        @InjectModel(Groups)
        private readonly groupsModel: typeof Groups,

        @InjectModel(Bots)
        private readonly botsModel: typeof Bots
    ) {}

    async getList(user: Users, queryParam: GetGroupsParamsDto): Promise<ApiResponseDto<GetGroupsResDto[]>> {
        
        let orderClause = []
        if (queryParam.cpu && queryParam.cpu.toUpperCase().match("DESC")) {
            orderClause.push(`"cpuPercentage" DESC `);
        }
        if (queryParam.ram && queryParam.ram.toUpperCase().match("DESC")) {
            orderClause.push(`"ramPercentage" DESC `); 
        }
        if (queryParam.status && queryParam.status.toUpperCase().match("DESC")) {
            orderClause.push(`"onlinePercentage" DESC `);
        }

        const query = `
            SELECT g."groupId", g."name", g.ip, g."cpuPercentage", g."ramPercentage", g."updatedAt",
                COUNT(*) AS "botTotal",
                FLOOR(SUM(CASE WHEN status = 'CONNECTED' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS "onlinePercentage",
                SUM(gems) AS "gemsTotal"
            FROM "Groups" g 
            INNER JOIN "Bots" b ON b."fkGroupId" = g."groupId" 
            WHERE 
                g."fkUserId" = '${user.userId}' 
                AND b."deletedAt" IS NULL 
                AND g."deletedAt" IS NULL
                ${queryParam.keyword? `AND g."name" ILIKE '%${queryParam.keyword}%'` : ''}
            GROUP BY g."groupId"
            ${orderClause.length>0 ? "ORDER BY " + orderClause.join(",").slice(0, -1) : ''};
        `;

        let response: GetGroupsResDto[];
        
        await this.groupsModel.sequelize
        .query(query, {type: QueryTypes.SELECT})
        .then((result: GroupsAndBots[]) => {response = result.map(this.toGroupListResponse)})

        return ApiResponseDto.success(response);
    }

    async getDetail(id: string): Promise<ApiResponseDto<GetGroupDetailReqDto>> {
        const group: Groups = await this.groupsModel.findOne({
            where: {
                groupId: id
            }
        })

        if (!group) {
            return ApiResponseDto.success(null)
        }

        const bots: Bots[] = await this.botsModel.findAll({
            where: {
                fkGroupId: group.groupId
            }
        })

        const response = new GetGroupDetailReqDto();
        response.id=group.groupId;
        response.groupName=group.name; 
        response.ip=group.ip;
        response.cpuPercentage=group.cpuPercentage;
        response.ramPercentage=group.ramPercentage;
        response.bots=this.toBotListResponse(bots);

        return ApiResponseDto.success(response);
    }

    async delete(user: Users, req: DeleteGroupReqDto): Promise<ApiResponseDto<void>> {
        
        await this.groupsModel.update({
            deletedAt: new Date().getTime()
        }, {
            where: {
                groupId: req.id,
                fkUserId: user.userId
            }
        })

        return ApiResponseDto.success(null);
    }

    private toBotListResponse(data: Bots[]): GetBotDetailResDto[] {
        const listBot: GetBotDetailResDto[] = [];
        data.forEach(bot => {
            const newBotRes = new GetBotDetailResDto();
            newBotRes.id=bot.botId;
            newBotRes.lvl=bot.lvl;
            newBotRes.gems=bot.gems;
            newBotRes.name=bot.name;
            newBotRes.status=bot.status;
            newBotRes.world=bot.world;
            newBotRes.updateAt=bot.updatedAt;

            listBot.push(newBotRes)
        })

        return listBot;
    }

    private toGroupListResponse(data: GroupsAndBots): GetGroupsResDto {
        const newGetGroupsResDto = new GetGroupsResDto()
        newGetGroupsResDto.id=data.groupId;
        newGetGroupsResDto.ip=data.ip;
        newGetGroupsResDto.groupName = data.name;
        newGetGroupsResDto.ramPercentage=data.ramPercentage;
        newGetGroupsResDto.cpuPercentage = data.cpuPercentage;
        newGetGroupsResDto.updatedAt=data.updatedAt;
        newGetGroupsResDto.botsMeta=new BotsMeta(data.botTotal, data.onlinePercentage, data.gemsTotal)

        return newGetGroupsResDto;
    }

}
