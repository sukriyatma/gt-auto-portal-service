import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BotActivity } from 'src/common/consts/bot-activity.const';
import { BotStatus } from 'src/common/consts/bot-status.const';

export class CreateDataBotReqDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    lvl: number;

    @IsNotEmpty()
    @IsString()
    world: string;
    
    @IsNotEmpty()
    @IsEnum(BotStatus)
    status: BotStatus;
    
    @IsNotEmpty()
    @IsNumber()
    gems: number;

    @IsOptional()
    @IsEnum(BotActivity)
    activity: BotActivity | null; 

}