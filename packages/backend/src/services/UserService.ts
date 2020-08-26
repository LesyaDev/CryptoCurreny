import User from "../entity/User";
import UserCoin from "../entity/UserCoin";
import Role from "../entity/Role";
import {
    connect,
    connected,
    getRoleRepository, getUserCoinAuditRepository,
    getUserCoinRepository,
    getUserRepository
} from "../dbConnection";
import UserCoinAudit from "../entity/UserCoinAudit";

interface IUser {
    name: string,
    email: string,
    role: number
}

export class UserService {

    constructor() {
        if (!connected()) {
            connect().then(() => {
            })
        }
    }

    async create(profileUser: IUser) {

        const role = new Role();
        role.role = profileUser.role;
        let roleEntity = await getRoleRepository().save(role);

        const userCoin = new UserCoin();
        userCoin.value = 5; //TODO: CHANGE

        let user_coin = await getUserCoinRepository().save(userCoin);

        const user = new User();
        user.email = profileUser.email;
        user.name = profileUser.name;
        user.user_coin = user_coin;
        user.role = roleEntity;

        let res = await getUserRepository().save(user)
        user_coin.current_owner = res;
        getUserCoinRepository().update(user_coin.id, user_coin);
        roleEntity.user = res;
        getRoleRepository().update(roleEntity.id, roleEntity);

        this.saveAudit(user_coin.value, user_coin.value, user_coin);
        return res;
    }

    async findByUser(query: any) {

        return getUserRepository().findOne(query);
    }

    async findOrCreate(user: IUser) {
        let userFind = await this.findByUser({email: user.email});
        if (userFind) {
            return userFind;
        } else {
            return this.create(user);
        }
    }

    async getUserCoin(user: any) {
        return getUserCoinRepository().findOne({current_owner: user})
    }

    async getRole(user: any) {
        return getRoleRepository().findOne({user: user})
    }

    async findAllUsers() {
        return getUserRepository().find()
    }

    async giveCoins(sender: any, recipientEmail: any, coins: number) {
        await this.changeCoins(await this.findByUser({email: recipientEmail}), coins);
        await this.changeCoins(sender, -coins);
    }

    async addCoins(currentUserEmail: string, coins: number) {
        let user = await this.findByUser({email: currentUserEmail});
        await this.changeCoins(user, coins);
    }

    async changeCoins(user: any, coins: number) {
        let userCoin = await this.getUserCoin(user);
        if (userCoin) {
            userCoin.value += coins;
            getUserCoinRepository().update(userCoin.id, userCoin);
            this.saveAudit(coins, userCoin.value, userCoin);
        }
    }

    saveAudit(value: number, total: number, user_coin: UserCoin) {
        const userCoinAudit = new UserCoinAudit();
        userCoinAudit.value = value;
        userCoinAudit.total = total;
        userCoinAudit.id_user_coin = user_coin;
        getUserCoinAuditRepository().save(userCoinAudit);
    }

    async getAudit(user: any) {
        let userCoin = await this.getUserCoin(user);
        return getUserCoinAuditRepository().find({id_user_coin: userCoin})
    }

    async removeUser(email: string) {
        let user = await this.findByUser({email: email}),
            role = await this.getRole(user),
            userCoin = await this.getUserCoin(user);

        if (user && role && userCoin) {
            await getUserRepository().delete(user);
            await getRoleRepository().delete(role);
        }
    }
}
