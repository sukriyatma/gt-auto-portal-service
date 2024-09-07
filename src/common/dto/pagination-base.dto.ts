import { PaginationDto } from "./pagination-dto";

export class PaginationBaseDto<Type> {

    data: Type;
    pagination: PaginationDto;
    
}