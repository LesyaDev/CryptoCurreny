import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Title} from "@tsed/swagger/lib";
import {Default} from "@tsed/common/lib";
import UserCoin from "./UserCoin";

@Entity()
export default class Coin {

    @Title("id")
    @PrimaryGeneratedColumn()
    id: string;

    @Title("value")
    @Default(0)
    @Column()
    value: number

    @Title("total")
    @Default(0)
    @Column()
    total: number

    @OneToMany(() => UserCoin, (user_coin: UserCoin) => user_coin.coin_id)
    @JoinColumn()
    user_coin: UserCoin[]
}