import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AppGuardService implements CanActivate {

    routerURL: string;

    constructor(private authService: AuthService,
                private router: Router) {
        this.routerURL = this.router.url;
    }

    async canActivate() {

        let isAuthorized = await this.authService.isSignInUser();

        if (!isAuthorized && this.routerURL != 'login') {
            this.routerURL = '/login'
            this.router.navigate(['/login'])
            return false;
        } else {
            if (this.routerURL == 'login') {
                let isAdmin = this.authService.isAdmin();
                this.routerURL = isAdmin ? '/admin' : '/home';
                return true;
            }
            this.routerURL = this.router.url
            return true;
        }
    }
}
