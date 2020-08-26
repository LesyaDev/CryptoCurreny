import {BodyParams, Middleware, Req, Res} from "@tsed/common";
import {UserService} from "../services/UserService";

@Middleware()
export class CoinsValidationMiddleware {
    constructor(private userService: UserService) {
    }

    async use(@Req() req: Req, @Res() res: Res, @BodyParams() body: any,) {
        let usersCoin = await this.userService.getUserCoin(req.user);

        if (usersCoin && usersCoin.value < body.coins) {
            res.status(400).send({
                error: 'You have entered incorrect data'
            })
        }
        return
    }
}
