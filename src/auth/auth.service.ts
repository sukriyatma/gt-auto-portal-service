import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorCode } from 'src/common/consts/error-code.const';
import { LoginProviders } from 'src/common/consts/login-providers.const';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { LoginReqDto } from 'src/common/dto/login-req.dto';
import { LoginResDto } from 'src/common/dto/login-res.dto';
import { Users } from 'src/common/models/users.model';
import "dotenv/config";
import { UserDetails } from 'src/common/dto/user-details';
import { ApiException } from 'src/common/exception/api-exception';
import { PasswordUtil } from 'src/common/utils/password-util';
import { UserInfoRes } from 'src/common/dto/discord/user-info-res.dto';
import axios from 'axios';
import { EndpointProviderAccess } from 'src/common/consts/endpoint-provider-access';
@Injectable()
export class AuthService {

    constructor(
        @InjectModel(Users)
        private readonly usersModel: typeof Users,
        private jwtService: JwtService,
    ) {}

    async login(req: LoginReqDto): Promise<ApiResponseDto<LoginResDto>> {

        const res: LoginResDto = new LoginResDto();
        let user: Users;
        if (req.providers && req.providers.type === LoginProviders.DISCORD) {
            user = await this.loginDiscord(req.providers.accessToken);
        } else {            
            user = await this.usersModel.findOne({
                where: {
                    email: req.email
                }
            }).then(async u => 
                (await PasswordUtil.passwordCompare(req.password, u.password))? u: null
            )
 
        }

        if (!user) {
            throw new ApiException(ErrorCode.EMAIL_PASSWORD_INCORRECT, HttpStatus.UNAUTHORIZED);
        }

        const payload: UserDetails = {userId: user.userId, email: user.email}
        res.accessToken = await this.jwtService.signAsync(payload);
        res.user = this.toUserResponse(user);

        return ApiResponseDto.success(res);
    }


    async register(email: string, password: string): Promise<ApiResponseDto<void>> {

        
        const user: Users = new Users();
        user.email = email;
        user.password = await PasswordUtil.passwordEncoder(password)
        user.apiKey = PasswordUtil.apiKeyGenerator()
        user.name = 'sukri'
        user.createdAt = new Date().getTime()

        user.save();
        return ApiResponseDto.success(null);
    }

    private async loginDiscord(accessToken: string): Promise<Users> {
        const response: UserInfoRes = await axios.get(EndpointProviderAccess.DISCORD, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => null);

        let [user, isCreated]: [Users, boolean] = await this.usersModel.findOrCreate({
            where: {
                email: response?.email ?? ""
            },
            defaults: {
                email: response.email,
                discordId: response.id,
                name: response.username,
                image: response.avatar,
                createdAt: new Date().getTime(),
                apiKey: PasswordUtil.apiKeyGenerator()
            }
        })

        if (!isCreated) {
            await user.update({
                name: response.username,
                image: response.avatar,
                updatedAt: new Date().getTime()
            });
        }
        return user;
    }

    private toUserResponse(user: Users) {
        return {
            email: user.email,
            name: user.name,
            image: user.image
        }
    }
}
