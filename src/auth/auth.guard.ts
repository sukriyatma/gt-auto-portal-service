import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { ErrorCode } from 'src/common/consts/error-code.const';
import { UserDetails } from 'src/common/dto/user-details';
import { ApiException } from 'src/common/exception/api-exception';
import { Users } from 'src/common/models/users.model';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private jwtService: JwtService,
  
    @InjectModel(Users)
    private readonly usersModel: typeof Users) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request: Request = context.switchToHttp().getRequest();
    const apiKey: string = this.extractApiKeyFromHeader(request);
    const token = this.extractTokenFromHeader(request);
    const path = request.path
    console.info("Request incoming body:", JSON.stringify(request.body))
    
    if (path.includes('private')) {

      if (!token && !apiKey) {
        throw new ApiException(ErrorCode.ACCESS_TOKEN_OR_API_KEY_INVALID, HttpStatus.UNAUTHORIZED);
      }

      let user: Users;

      if (token) {
        const payload: UserDetails = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET
          }
        );
        user = await this.usersModel.findOne({
          where: {
            userId: payload.userId
          }
        })

      }

      if (apiKey) {
        user = await this.usersModel.findOne({
          where: {
            apiKey: apiKey
          }
        })
      }

      request["user"] = user;
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    return request.headers["API-KEY"] as string ?? undefined;
  }
}
