import { IsNotEmpty } from "class-validator";

export class DeleteBotReq {
    
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    groupId: string;
}