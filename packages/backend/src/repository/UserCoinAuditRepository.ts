import {EntityRepository, Repository} from "typeorm";
import UserCoinAudit from "../entity/UserCoinAudit";

@EntityRepository(UserCoinAudit)
export class UserCoinAuditRepository extends Repository<UserCoinAudit> {

    constructor() {
        super();
    }

    findOne(query:any) {
        return super.findOne(query);
    }
}
