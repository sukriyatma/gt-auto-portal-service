import { Column, Index, Model, PrimaryKey, Table } from "sequelize-typescript";
import { BIGINT, SMALLINT, STRING, UUID, UUIDV4 } from "sequelize";

@Table({
    timestamps: false
})
export class Groups extends Model {

    @PrimaryKey
    @Column({type: UUID, defaultValue: UUIDV4})
    groupId: string;

    @Index("group_index")
    @Column({type: UUID})
    fkUserId: string;

    @Index("group_index")
    @Column({type: STRING(50)})
    name: string;

    @Column({type: STRING(50)})
    ip: string;

    @Column(SMALLINT)
    cpuPercentage: number;

    @Column(SMALLINT)
    ramPercentage: number;

    @Column({type: BIGINT, defaultValue: null})
    createdAt: number;

    @Column({type: BIGINT, defaultValue: null})
    updatedAt: number;

    @Column({type: BIGINT, defaultValue: null})
    deletedAt: number;

}