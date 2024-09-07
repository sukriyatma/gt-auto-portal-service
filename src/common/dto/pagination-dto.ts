export class PaginationDto {
    nextPage: string | null;

    constructor(nextPage: string) {
        this.nextPage = nextPage
    }
}