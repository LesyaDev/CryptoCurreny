import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Coin from "./Coin";
import UserCoinAudit from "./UserCoinAudit";

@Entity()
export default class UserCoin {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Coin, (coin_id: Coin) => coin_id.user_coin)
    @JoinColumn()
    coin_id: Coin

    @Column()
    value: number;

    @OneToOne(() => User)
    @JoinColumn()
    current_owner: User;

    @OneToMany(() => UserCoinAudit, (user_coin_audit: UserCoinAudit) => user_coin_audit.id, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    user_coin_audit: UserCoinAudit[];
}
