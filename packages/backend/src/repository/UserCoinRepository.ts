import {EntityRepository, Repository} from "typeorm";
import UserCoin from "../entity/UserCoin";

@EntityRepository(UserCoin)
export class UserCoinRepository extends Repository<UserCoin> {

    constructor() {
        super();
    }

    findOne(query:any) {
        return super.findOne(query);
    }
}