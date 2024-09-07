import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req } from '@nestjs/common';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { DeleteBotReq } from 'src/common/dto/delete-bot-req.dto';
import { BotService } from './bot.service';

@Controller('/private/v1/bot')
export class BotController {

    constructor(
        @Inject()
        private botService: BotService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post("delete")
    async delete(@Req() req: any ,@Body() deleteBotReq: DeleteBotReq): Promise<ApiResponseDto<void>> {
        return this.botService.delete(deleteBotReq)
    }

}
