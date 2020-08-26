import {BodyParams, Controller, Header, Put, Req, Required, UseAfter, UseBefore} from "@tsed/common";
import {Authenticate} from "@tsed/passport";
import {UserService} from "../services/UserService";
import {RequestUserMiddleware} from "../middlewares/RequestUserMidleware";
import {CoinsValidationMiddleware} from "../middlewares/CoinsValidationMiddleware";
import {CheckAdminRoleMiddleware} from "../middlewares/CheckAdminRoleMiddleware";

@Controller("/coin")
export class CoinController {
    constructor(private userService: UserService) {
    }

    @Put("/present")
    @UseBefore(CoinsValidationMiddleware)
    @UseAfter(RequestUserMiddleware)
    @Header('Authorization', 'Bearer')
    @Authenticate('google-verify-token')
    async giveCoins(@Req() req: Req, @Required() @BodyParams() body: any) {
        if (req.user && body.recipientEmail && body.coins) {
            await this.userService.giveCoins(req.user, body.recipientEmail, body.coins);
        }
    }

    @Put("/add")
    @UseBefore(CheckAdminRoleMiddleware)
    @UseAfter(RequestUserMiddleware)
    @Header('Authorization', 'Bearer')
    @Authenticate('google-verify-token')
    async addCoins(
        @Req() req: Req,
        @Required() @BodyParams() body: { userEmail: string, coins: number }) {
        if (req.user && body.userEmail && body.coins) {
            await this.userService.addCoins(body.userEmail, body.coins);
        }
    }
}
