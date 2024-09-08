import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Groups } from 'src/common/models/groups.model';
import { Bots } from 'src/common/models/bots.model';

@Module({
  imports: [SequelizeModule.forFeature([Groups, Bots])],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
