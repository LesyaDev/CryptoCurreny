import {Controller, Get, Header, Req, UseAfter} from "@tsed/common/lib";
import {Authenticate} from "@tsed/passport";
import {AuthUserMiddleware} from "../middlewares/AuthUserMiddleware";
import {UserService} from "../services/UserService";

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService) {
    }

    @Get('/google')
    @UseAfter(AuthUserMiddleware)
    @Header('Authorization', 'Bearer')
    @Authenticate('google-verify-token')
    async auth(@Req() req: Req) {
    }
}
