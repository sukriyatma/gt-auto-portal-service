import { IsNotEmpty } from "class-validator";

export class ReadNotificationDto {
    @IsNotEmpty({
        each: true
    })
    id: string;
}