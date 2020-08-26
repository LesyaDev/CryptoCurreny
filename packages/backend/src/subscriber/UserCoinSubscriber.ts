import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import UserCoin from "../entity/UserCoin";

@EventSubscriber()
export class UserCoinSubscriber implements EntitySubscriberInterface<UserCoin> {

    listenTo(): Function | string {
        return UserCoin;
    }
    afterInsert(event: InsertEvent<UserCoin>): Promise<any> | void {
    }
}
