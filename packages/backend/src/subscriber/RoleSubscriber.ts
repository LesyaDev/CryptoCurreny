import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import Role from '../entity/Role';

@EventSubscriber()
export class RoleSubscriber implements EntitySubscriberInterface<Role> {

    listenTo(): Function | string {
        return Role;
    }
    afterInsert(event: InsertEvent<Role>): Promise<any> | void {
    }
}
