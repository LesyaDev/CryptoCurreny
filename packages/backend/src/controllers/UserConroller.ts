import {Controller, Get, Req, Header, Use, Res, UseBefore, UseAfter, Delete, QueryParams} from "@tsed/common/lib";
import {UserService} from "../services/UserService";
import {Authenticate} from "@tsed/passport";
import {RequestUsersListMiddleware} from "../middlewares/RequestUsersListMiddleware";
import {CheckAdminRoleMiddleware} from "../middlewares/CheckAdminRoleMiddleware";

@Controller("/user")
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get("/")
    @Header('Authorization', 'Bearer')
    @Authenticate('google-verify-token')
    async getUserAndCoin(@Req() req: Req) {
        let user: any;

        user = req.user;
        if (user) {
            let coin = await this.userService.getUserCoin(user);

            return {
                coin: coin ? coin.value : 0,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }

    @Get("/list")
    @Use(RequestUsersListMiddleware)
    @Header('Authorization', 'Bearer')
    @Authenticate('google-verify-token')
    async getUsersList(@Req() req: Req, @Res() res: Res) {
    }


    @Delete("/remove")
    @UseBefore(CheckAdminRoleMiddleware)
    @UseAfter(RequestUsersListMiddleware)
    @Header('Authorization', 'Bearer')
    @Authenticate('google-verify-token')
    async removeUser(@Req() req: Req, @Res() res: Res, @QueryParams('userEmail') userEmail: string) {
        await this.userService.removeUser(userEmail);
        let user = await this.userService.findByUser({email: userEmail});
        console.log('result', user);
    }
}
