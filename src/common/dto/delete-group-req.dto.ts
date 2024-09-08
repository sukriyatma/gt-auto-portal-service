import { IsNotEmpty } from "class-validator";

export class DeleteGroupReqDto {
    @IsNotEmpty()
    id: string;
}