import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginReqDto } from 'src/common/dto/login-req.dto';
import { LoginResDto } from 'src/common/dto/login-res.dto';
import { AuthService } from './auth.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Controller('/public/v1/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post("/login")
    login(@Body() req: LoginReqDto): Promise<ApiResponseDto<LoginResDto>> {
        return this.authService.login(req);
    }

    @Post("register")
    register(@Body() req: LoginReqDto): Promise<ApiResponseDto<void>> {
        return this.authService.register(req.email, req.password);
    } 

}
