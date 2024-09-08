import { GetBotDetailResDto } from "./get-bot-detail-res.dto";

export class GetGroupDetailReqDto {
    id: string;
    groupName: string;
    ip: string;
    cpuPercentage: number;
    ramPercentage: number;
    bots: GetBotDetailResDto[]
}