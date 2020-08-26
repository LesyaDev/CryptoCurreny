import Coin from "../entity/Coin";
import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";

@EventSubscriber()
export class CoinSubscriber implements EntitySubscriberInterface<Coin> {

    listenTo(): Function | string {
        return Coin;
    }
    afterInsert(event: InsertEvent<Coin>): Promise<any> | void {
    }
}
