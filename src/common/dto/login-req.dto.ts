import { ProviderLoginReqDto } from "./provider-login-req.dto";

export class LoginReqDto {
    email: string;
    password: string;
    providers: ProviderLoginReqDto;
}