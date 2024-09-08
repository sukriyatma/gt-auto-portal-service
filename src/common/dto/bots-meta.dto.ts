export class BotsMeta {
    total: number;
    onlinePercentage: number;
    gems: number;

    constructor(total: number, onlinePercentage: number, gems: number) {
        this.total = total;
        this.onlinePercentage = onlinePercentage;
        this.gems = gems;
    }
}