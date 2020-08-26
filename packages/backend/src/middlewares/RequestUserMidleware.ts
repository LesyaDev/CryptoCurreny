import {BodyParams, Middleware, Req, Res} from "@tsed/common";
import {UserService} from "../services/UserService";

@Middleware()
export class RequestUserMiddleware {

    constructor(private userService: UserService) {
    }

    async use(@Req() req: Req, @Res() res: Res, @BodyParams() body: { userEmail: string }) {
        if (req.user) {
            let query = body.userEmail ? {email: body.userEmail} : req.user
            let user = await this.userService.findByUser(query),
                coin = await this.userService.getUserCoin(user)

            if (user) {
                res.send({
                    name: user.name,
                    email: user.email,
                    coin: coin ? coin.value : 0
                });
            }

        } else {
            return 'error';
        }
    }
}
