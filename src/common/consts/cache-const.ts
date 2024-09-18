export class CacheConst {
    public static readonly GROUPS_LIST = new CacheConst("GROUPS_LIST:", 30 * 1000);

    constructor(
        public readonly key: string, 
        public readonly ttl: number) {}
}