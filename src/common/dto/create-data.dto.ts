import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateDataBotReqDto } from './create-data-bot.dto';
import { Type } from 'class-transformer';

export class CreateDataReqDto {
    
    @IsNotEmpty()
    groupName : string; // M
    
    @IsOptional()
    @IsString()
    ip: string;
    
    @IsNotEmpty()
    cpuPercentage : number;
    
    @IsNotEmpty()
    ramPercentage: number;
    
    @ValidateNested()
    @Type(() => CreateDataBotReqDto)
    bot: CreateDataBotReqDto;

}