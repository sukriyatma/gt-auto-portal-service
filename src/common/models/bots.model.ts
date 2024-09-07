import { BIGINT, INTEGER, SMALLINT, STRING, UUID, UUIDV4 } from "sequelize";
import { Column, Index, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    timestamps: false
})
export class Bots extends Model {
    
    @PrimaryKey
    @Column({type: UUID, defaultValue: UUIDV4})
    botId: string;

    @Column(UUID)
    @Index("bot_index")
    fkGroupId: string;

    @Column(STRING(50))
    @Index("bot_index")
    name: string;

    @Column(SMALLINT)
    lvl: number;

    @Column(STRING(50))
    world: string;

    @Column(STRING(50))
    status: string;

    @Column(INTEGER)
    gems: number;

    @Column({type: BIGINT, defaultValue: null})
    createdAt: number;

    @Column({type: BIGINT, defaultValue: null})
    updatedAt: number;

    @Column({type: BIGINT, defaultValue: null})
    deletedAt: number;
}