import { Body, Controller, Get, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notifications } from 'src/common/models/notifications.model';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { ReadNotificationDto } from 'src/common/dto/read-notification.dto';
import { GetNotificationsParamsDto } from 'src/common/dto/get-notifications-params.dto';
import { PaginationBaseDto } from 'src/common/dto/pagination-base.dto';

@Controller('/private/v1/notifications')
export class NotificationController {

    constructor(
        private readonly notificationService: NotificationService
    ) {}

    @Get()
    @HttpCode(200)
    get(@Req() req: any, @Query() query: GetNotificationsParamsDto): Promise<ApiResponseDto<PaginationBaseDto<Notifications[]>>> {
        return this.notificationService.getList(query, req.user)
    }

    @Post("/read")
    read(@Req() req: any, @Body() body: ReadNotificationDto): Promise<ApiResponseDto<void>> {
        return this.notificationService.read(req.user, body)
    }
}
