import { BotActivity } from "../consts/bot-activity.const";
import { BotStatus } from "../consts/bot-status.const";
import { Bots } from "../models/bots.model";
import { Groups } from "../models/groups.model";
import { Users } from "../models/users.model";

export class CreateNotificationDto {
    group: Groups; 
    bot: Bots; 
    user: Users;
    type: BotActivity | BotStatus
}