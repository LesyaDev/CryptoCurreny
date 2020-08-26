import {UserService} from "../services/UserService";
import {Middleware, Req, Res} from "@tsed/common";

@Middleware()
export class CheckAdminRoleMiddleware {
    ROLE_ADMIN = 2;

    constructor(private userService: UserService) {
    }

    async use(@Req() req: Req, @Res() res: Res) {
        if (req.user) {
            let role = await this.userService.getRole(req.user);

            if (!(role ? role.role == this.ROLE_ADMIN : false)) {
                res.status(403);
            } else {
                return
            }
        }
    }
}
