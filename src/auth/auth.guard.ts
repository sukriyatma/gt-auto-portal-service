import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { ErrorCode } from 'src/common/consts/error-code.const';
import { UserDetails } from 'src/common/dto/user-details';
import { ApiException } from 'src/common/exception/api-exception';
import { Users } from 'src/common/models/users.model';
import { GAPLoggerService } from 'src/common/utils/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private jwtService: JwtService,
  
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
  
    @Inject(GAPLoggerService)
    private readonly logger: GAPLoggerService  
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request: Request = context.switchToHttp().getRequest();
    const apiKey: string = this.extractApiKeyFromHeader(request);
    const token = this.extractTokenFromHeader(request);
    const path = request.path
    
    if (path.includes('private')) {

      if (!token && !apiKey) {
        throw new ApiException(ErrorCode.ACCESS_TOKEN_OR_API_KEY_INVALID, HttpStatus.UNAUTHORIZED);
      }

      let user: Users;
      try {
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
      } catch (error) {
        throw new ApiException(ErrorCode.JWT_API_KEY_ERROR, HttpStatus.UNAUTHORIZED); 
      }

      if (!user) {
        throw new ApiException(ErrorCode.ACCESS_TOKEN_OR_API_KEY_INVALID, HttpStatus.UNAUTHORIZED);
      }

      this.logger.log(`Request incoming ${JSON.stringify(request.path)} with body : ${JSON.stringify(request.body)}`, this)
      
      request["user"] = user;
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined;
  }

  private extractApiKeyFromHeader(request: Request): string | null {
    return request.headers["x-api-key"] as string ?? null;
  }
}
