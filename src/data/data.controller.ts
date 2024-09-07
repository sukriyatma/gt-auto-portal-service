import { Body, Controller, HttpCode, Post, Req, Request } from '@nestjs/common';
import { CreateDataReqDto } from 'src/common/dto/create-data.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { DataService } from './data.service';
import { UserDetails } from 'src/common/dto/user-details';

@Controller('/private/v1/data')
export class DataController {

    constructor(private readonly dataService: DataService) {}

    @Post()
    @HttpCode(200)
    create(@Request() request, @Body() data: CreateDataReqDto): Promise<ApiResponseDto<void>> {
        return this.dataService.create(data, request.user);
    }

}
