import {Injectable, NgZone} from "@angular/core";
import _ from "lodash";
import GoogleUser = gapi.auth2.GoogleUser;
import {GoogleAuthService} from "ng-gapi/lib/src";
import {Router} from "@angular/router";
import {Role} from "../models/role";
import {IUser} from "../models/user";
import {AppService} from "./app.service";

@Injectable()
export class AuthService {
    public static readonly LOCAL_STORAGE_KEY: string = "accessToken";
    user: GoogleUser;
    role: number;

    constructor(private googleAuthService: GoogleAuthService,
                private ngZone: NgZone,
                private  router: Router,
                private appService: AppService) {
    }

    public setUser(user: GoogleUser): void {
        this.user = user;
    }

    getToken() {
        let token: string = localStorage.getItem(AuthService.LOCAL_STORAGE_KEY);
        if (!token) {
            return undefined;
        }
        return token;
    }

    async signIn() {

        let auth = this.googleAuthService.getAuth()
        auth.subscribe((googleAuth) => {

            googleAuth.signIn().then(res => {
                let id_token = res.getAuthResponse().id_token;

                this.appService.validateUser(id_token).subscribe(
                    (user: IUser) => {
                        this.setRole(user.role);
                        this.setUser(res)
                        this.signInSuccessHandler(res)
                    }, (error) => {
                        this.signOut();

                        console.log('Error', error);
                    }
                );
            }, err => {
                this.signOut();

                this.signInErrorHandler(err)
            })
        })
    }

    public signOut(): void {
        this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            localStorage.removeItem(AuthService.LOCAL_STORAGE_KEY);
            this.router.navigate(['/login'])
        })
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(localStorage.getItem(AuthService.LOCAL_STORAGE_KEY));
    }

    public signInSuccessHandler(res: GoogleUser) {
        this.ngZone.run(() => {
            this.user = res;
            this.router.navigate([this.isAdmin() ? '/admin' : '/home']);
            localStorage.setItem(
                AuthService.LOCAL_STORAGE_KEY, res.getAuthResponse().id_token
            );
        });
    }

    public signInErrorHandler(err: Error) {
        console.warn(err);
    }

    async isSignInUser() {
        let token = this.getToken();
        return !!token;
    }

    setRole(role) {
        this.role = role;
    }

    isAdmin() {
        return this.role == Role.admin
    }
}
