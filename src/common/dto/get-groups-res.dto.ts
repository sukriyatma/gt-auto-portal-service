import { BotsMeta } from "./bots-meta.dto";

export class GetGroupsResDto {
    id: string;
    groupName: string;
    ip: string | null;
    cpuPercentage: number;
    ramPercentage: number;
    updatedAt: number;
    botsMeta: BotsMeta;
}