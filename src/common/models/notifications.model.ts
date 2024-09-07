import { Column, Index, Model, PrimaryKey, Table } from "sequelize-typescript";
import { BIGINT, STRING, UUID, UUIDV4 } from "sequelize";

@Table({
    timestamps: false
})
export class Notifications extends Model {

    @PrimaryKey
    @Column({type: UUID, defaultValue: UUIDV4})
    notificationId: string;

    @Column(STRING(50))
    type: string;

    @Column(UUID)
    fkBotId: string;

    @Column(UUID)
    fkGroupId: string;

    @Index("notification_index")
    @Column(UUID)
    fkUserId: string;

    @Column(STRING)
    title: string;

    @Column(STRING)
    description: string;

    @Index("notification_index")
    @Column({type: BIGINT, defaultValue: null})
    createdAt: number;

    @Column({type: BIGINT, defaultValue: null})
    updatedAt: number;

    @Column({type: BIGINT, defaultValue: null})
    readAt: number;
    
}