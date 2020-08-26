import {Middleware, Req, Res} from "@tsed/common";
import {UserService} from "../services/UserService";

@Middleware()
export class RequestUsersListMiddleware {
    ROLE_ADMIN = 2;
    ROLE_USER = 1;

    constructor(private userService: UserService) {
    }

    async use(@Req() req: Req, @Res() res: Res) {
        if (req.user) {
            let currentUser: any, currentEmail: any,
                currentUserRole: any, role: any,
                usersList: any, list: any[];

            currentUser = await this.userService.findByUser(req.user);
            currentEmail = currentUser ? currentUser.email : '';
            currentUserRole = await this.userService.getRole(req.user);
            role = currentUserRole ? currentUserRole.role : -1;
            usersList = await this.userService.findAllUsers();
            list = [];

            for (let i = 0; i < usersList.length; i++) {
                let user = usersList[i],
                    coin = await this.userService.getUserCoin(user),
                    profileUser = this.createProfileUser({
                        name: user.name,
                        email: user.email,
                        coin: coin ? coin.value : 0,
                        role: role
                    });

                if (!(role == this.ROLE_USER && user.email === currentEmail)) {
                    list.push(profileUser);
                }
            }
            res.send(list);
        } else {
            return 'error';
        }
    }

    createProfileUser(user: { name: string, email: string, coin: number, role: number }) {
        let userCoin = user.role == this.ROLE_ADMIN ? user.coin : undefined;

        return {
            name: user.name,
            email: user.email,
            coin: userCoin
        };
    }
}
