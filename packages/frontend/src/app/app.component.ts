import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    isShowSignOutButton: boolean;
    title = 'frontend';

    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe(() => {
            this.isShowButton();
        });
    }

    signOut() {
        this.authService.signOut();
    }

    isShowButton() {
        this.authService.isSignInUser().then((isShow) => {
            this.isShowSignOutButton = isShow;
        })
    }
}
