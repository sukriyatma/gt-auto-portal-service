import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/common/consts/error-code.const";

export class ApiException extends HttpException {
    
    public errorCode: ErrorCode;

    constructor(errorCode: ErrorCode, httpStatus?: HttpStatus | HttpStatus.BAD_REQUEST) {
        super(errorCode.message, httpStatus);
        this.errorCode = errorCode;
    }

}