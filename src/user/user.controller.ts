import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { UpdateFcmTokenDto } from 'src/common/dto/update-fcmtoken.dto';
import { Users } from 'src/common/models/users.model';
import { GetApiKeyResDto } from 'src/common/dto/get-apiKey-res.dto';

@Controller('/private/v1/user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Post("/update/fcmtoken")
    async updateFcmToken(@Body() data: UpdateFcmTokenDto, @Request() req: any): Promise<ApiResponseDto<void>> {
        const user: Users =  req.user;
        return this.userService.updateFcmToken(data, user); 
    }

    @Get("/apikey")
    async getApiKey(@Request() req: any): Promise<ApiResponseDto<GetApiKeyResDto>> {
        const user: Users =  req.user;
        return await this.userService.getApiKey(user);
    }

    @Post("/apikey/reset")
    async resetApiKey(@Request() req: any): Promise<ApiResponseDto<GetApiKeyResDto>> {
        const user: Users =  req.user;
        return await this.userService.resetApiKey(user);
    }
}
