import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bots } from 'src/common/models/bots.model';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';

@Module({
    imports: [SequelizeModule.forFeature([Bots])],
    providers: [BotService],
    controllers: [BotController]
})
export class BotModule {}
