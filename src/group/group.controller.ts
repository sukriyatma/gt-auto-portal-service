import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Query, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { GetGroupsParamsDto } from 'src/common/dto/get-groups-params.dto';
import { GetGroupsResDto } from 'src/common/dto/get-groups-res.dto';
import { Groups } from 'src/common/models/groups.model';
import { GroupService } from './group.service';
import { DeleteGroupReqDto } from 'src/common/dto/delete-group-req.dto';
import { GetGroupDetailReqDto } from 'src/common/dto/get-group-detail-res.dto';

@Controller('/private/v1/group')
export class GroupController {

    constructor(
        @Inject(GroupService)
        private readonly groupService: GroupService
    ) {}

    @Get("/list")
    @HttpCode(HttpStatus.OK)
    async list(@Req() req: any,@Query() queryParam: GetGroupsParamsDto): Promise<ApiResponseDto<GetGroupsResDto[]>> {
        return this.groupService.getList(req.user, queryParam)
    }

    @Get("/detail/:id")
    async getDetails(@Param('id') id: string): Promise<ApiResponseDto<GetGroupDetailReqDto>> {
        return this.groupService.getDetail(id)
    }

    @Post("delete")
    @HttpCode(HttpStatus.OK)
    async delete(@Req() req: any, @Body() body: DeleteGroupReqDto): Promise<ApiResponseDto<void>> {
        return this.groupService.delete(req.user, body)
    }
}
