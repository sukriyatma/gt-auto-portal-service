import { Body, Controller, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { UpdateFcmTokenDto } from 'src/common/dto/update-fcmtoken.dto';
import { Users } from 'src/common/models/users.model';

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

}
