import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Format, MaxLength, MinLength, Pattern, Required, Title} from "@tsed/common";
import {Example} from "@tsed/swagger";
import UserCoin from "./UserCoin";
import Role from './Role';

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Title("name")
    @Example("FirstName LastName")
    @MinLength(3)
    @MaxLength(100)
    @Column()
    @Required()
    name: string;

    @Title("email")
    @Example("user@gmail.com")
    @Format("email")
    @Pattern(/^([a-zA-Z0-9_\-.]+)@gmail.com$/)
    @Required()
    @Column({unique: true})
    email: string;

    @OneToOne(() => UserCoin, {
        onDelete: 'CASCADE',
        cascade: true
    })
    @JoinColumn()
    user_coin: UserCoin

    @OneToOne(() => Role, {
        onDelete: 'CASCADE',
        cascade: true
    })
    @JoinColumn()
    role: Role
}
