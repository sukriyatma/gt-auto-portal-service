import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorCode } from 'src/common/consts/error-code.const';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { DeleteBotReq } from 'src/common/dto/delete-bot-req.dto';
import { Bots } from 'src/common/models/bots.model';

@Injectable()
export class BotService {

    constructor(
        @InjectModel(Bots)
        private readonly botsModule: typeof Bots
    ) {}

    async delete (req: DeleteBotReq): Promise<ApiResponseDto<void>> {
        const [affectedCount] = await this.botsModule.update(
            {
                deletedAt: new Date().getTime()
            }, {
                where: {
                    botId: req.id,
                    fkGroupId: req.groupId
                }
            }
        )

        if (affectedCount === 0) {
            return ApiResponseDto.error(ErrorCode.DELETE_BOT_ERROR);
        }

        return ApiResponseDto.success(null); 
    }
}
