import {Middleware, Req, Res} from "@tsed/common";
import {UserService} from "../services/UserService";

@Middleware()
export class AuthUserMiddleware {

    constructor(private userService: UserService) {
    }

    async use(@Req() req: Req, @Res() res: Res) {

        if (req.user) {
            let user: Express.User = req.user,
                userInfo = await this.userService.findByUser(user),
                role = await this.userService.getRole(user);

            if (userInfo) {
                res.send({
                    name: userInfo.name,
                    email: userInfo.email,
                    role: role ? role.role : -1
                });
            }
        }
    }
}
