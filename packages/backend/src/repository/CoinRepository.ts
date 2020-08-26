import {EntityRepository, Repository} from "typeorm";
import Coin from "../entity/Coin";

@EntityRepository(Coin)
export class CoinRepository extends Repository<Coin> {

    constructor() {
        super();
    }

    findOne(query:any) {
        return super.findOne(query);
    }
}