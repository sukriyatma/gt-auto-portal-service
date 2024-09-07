import { IsEnum, IsNotEmpty } from "class-validator";
import { LoginProviders } from "src/common/consts/login-providers.const";

export class ProviderLoginReqDto {
    
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @IsEnum(LoginProviders)
    accessToken: LoginProviders;
    
}