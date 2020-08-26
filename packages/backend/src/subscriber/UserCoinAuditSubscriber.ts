import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import UserCoinAudit from "../entity/UserCoinAudit";

@EventSubscriber()
export class UserCoinAuditSubscriber implements EntitySubscriberInterface<UserCoinAudit> {

    listenTo(): Function | string {
        return UserCoinAudit;
    }
    afterInsert(event: InsertEvent<UserCoinAudit>): Promise<any> | void {
    }
}
