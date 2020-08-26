import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import UserCoin from "./UserCoin";
import {Title} from "@tsed/common/lib";

@Entity()
export default class UserCoinAudit {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Title("value")
    @Column()
    value: number;

    @Title("total")
    @Column()
    total: number;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => UserCoin, (id_user_coin: UserCoin) => id_user_coin.user_coin_audit)
    @JoinColumn()
    id_user_coin: UserCoin;
}
