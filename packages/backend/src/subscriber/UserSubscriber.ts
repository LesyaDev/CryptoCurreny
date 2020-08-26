import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import User from "../entity/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo(): Function | string {
        return User;
    }
    afterInsert(event: InsertEvent<User>): Promise<any> | void {
    }
}
