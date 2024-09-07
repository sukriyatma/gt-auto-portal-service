import { Exclude } from "class-transformer";
import { BIGINT, UUID, UUIDV4, STRING } from "sequelize";
import { Column, Index, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    timestamps: false
})
export class Users extends Model {
    
    @PrimaryKey
    @Column({type: UUID, defaultValue: UUIDV4})
    userId: string;

    @Index("user_index")
    @Column(STRING(50))
    email: string;

    @Exclude()
    @Column(STRING)
    password: string;

    @Index("user_index")
    @Column(STRING)
    @Exclude()
    discordId: string;

    @Exclude()
    @Column(STRING)
    fcmToken: string;

    @Exclude()
    @Column(STRING)
    apiKey: string;

    @Column(STRING(50))
    name: string;

    @Column(STRING)
    image: string;

    @Exclude()
    @Column({type: BIGINT, defaultValue: null})
    createdAt: number;

    @Exclude()
    @Column({type: BIGINT, defaultValue: null})
    updatedAt: number;

    @Exclude()
    @Column({type: BIGINT, defaultValue: null})
    deletedAt: number;
    
}