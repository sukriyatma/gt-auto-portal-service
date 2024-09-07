import { ErrorCode } from "src/common/consts/error-code.const";

export class ApiResponseDto<Type> {

    private data: Type;

    private errCode: string;

    private success: boolean = true;

    private message: string;

    public static success<Type>(data: Type, message?: string): ApiResponseDto<Type>{
        const response: ApiResponseDto<Type> = new ApiResponseDto<Type>();
        response.setErrCode("");
        response.setData(data);
        response.setMessage(message);
        return response;
    }

    public static error<Type>(errorCode: ErrorCode, data?: Type): ApiResponseDto<Type>{
        return this.transError(errorCode.code, errorCode.message, data);
    }

    private static transError<Type>(errCode: string, message: string, data: Type): ApiResponseDto<Type>{
        const response: ApiResponseDto<Type> = new ApiResponseDto<Type>();
        response.setErrCode(errCode);
        response.setData(data);
        response.setSuccess(false);
        response.setMessage(message);
        return response;
    }

    setSuccess(success: boolean) {
        this.success = success;
    }
    setData(data: any) {
        this.data = data;
    }
    setErrCode(errCode: string) {
        this.errCode = errCode;
    }
    setMessage(message: string) {
        this.message = message;
    }
}