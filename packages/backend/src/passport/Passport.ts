import {UserService} from "../services/UserService";
import * as passport from "passport";
import {web} from "../keys.json";
import User from "../entity/User";

const enum ROLE {
    user = 1,
    admin = 2
}

let userService = new UserService(),
    VerifyTokenStrategy = require('passport-google-verify-token').Strategy;

passport.use('google-verify-token',
    new VerifyTokenStrategy({
            clientID: web.client_id
        },
        (parsedToken: any, googleId: any, done: any) => {
            let profileUser: { role: number; name: any; email: any };

            profileUser = {
                name: parsedToken.name,
                email: parsedToken.email,
                role: ROLE.user
            };

            userService.findOrCreate(profileUser).then(
                (user) => {
                    return done(null, user);
                }, (err: Error) => {
                    return done(err, null);
                });
        }
    )
)
