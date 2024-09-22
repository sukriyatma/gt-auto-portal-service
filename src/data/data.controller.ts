import { Body, Controller, HttpCode, Post, Req, Request, UseInterceptors } from '@nestjs/common';
import { CreateDataReqDto } from 'src/common/dto/create-data.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { DataService } from './data.service';

@Controller('/private/v1/data')
export class DataController {

    constructor(private readonly dataService: DataService) {}

    @Post()
    @HttpCode(200)
    async create(@Request() request, @Body() data: CreateDataReqDto): Promise<ApiResponseDto<void>> {
        return this.dataService.create(data, request.user);
    }

}
