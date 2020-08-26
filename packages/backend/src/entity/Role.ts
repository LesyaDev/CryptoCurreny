import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {Title, Enum} from '@tsed/common';
import User from "./User";

enum RoleName {
    user = 1,
    admin = 2
}

@Entity()
export default class Role {
    @Title("id")
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Enum(RoleName)
    role: RoleName

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
