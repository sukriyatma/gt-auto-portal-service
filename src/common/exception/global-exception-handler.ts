import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiResponseDto } from "src/common/dto/api-response.dto";
import { ApiException } from "./api-exception";
import { ErrorCode } from "src/common/consts/error-code.const";

@Catch(ApiException)
export class GlobalExceptionHandler implements ExceptionFilter {
    
    catch(exception: ApiException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus(); 
        const errorCode: ErrorCode = exception.errorCode;       

        response
            .status(status)
            .json(ApiResponseDto.error(errorCode))
    }

}