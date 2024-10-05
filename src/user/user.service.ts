import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { GetApiKeyResDto } from 'src/common/dto/get-apiKey-res.dto';
import { UpdateFcmTokenDto } from 'src/common/dto/update-fcmtoken.dto';
import { Users } from 'src/common/models/users.model';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(Users)
        private readonly usersModel: typeof Users
    ) {}

    async updateFcmToken(req: UpdateFcmTokenDto, user: Users): Promise<ApiResponseDto<void>> {
        await this.usersModel.update(
            {
                fcmToken: req.fcmToken
            },
            {
                where: {
                    userId: user.userId
                }
            }
        );

        return ApiResponseDto.success(null);
    }

    async getApiKey(user: Users): Promise<ApiResponseDto<GetApiKeyResDto>> {
        const response = new GetApiKeyResDto();
        response.apiKey = user.apiKey;
        console.log(user)

        return ApiResponseDto.success(response);
    }
}
