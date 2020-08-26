import {Component, OnInit} from '@angular/core';
import {AppService} from "../services/app.service";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../models/user";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    isShowUserInfo: boolean;
    userName: string;
    coins: number;
    usersList: {};
    giveCoinsForm: FormGroup;
    currentUser = new FormControl('', [
        Validators.minLength(12)
    ]);
    presentCoins = new FormControl('', [
        Validators.min(1),
        Validators.max(this.getMaxGiveCoins())
    ]);

    constructor(private authService: AuthService,
                private appService: AppService,
                private formBuilder: FormBuilder) {

        this.setShowUserInfo(false);
    }

    ngOnInit() {
        this.userInfo().then()
        this.giveCoinsForm = this.formBuilder.group({
            presentCoins: this.presentCoins,
            currentUser: this.currentUser
        });
    }

    async userInfo() {
        let access_token = this.getAccessToken()
        let observable = await this.appService.getUser(access_token);

        observable.subscribe((user: any) => {
            this.setShowUserInfo(user.name);
            this.userName = user.name;
            this.coins = user.coin;

            this.presentCoins.setValidators([
                Validators.min(1),
                Validators.max(this.getMaxGiveCoins())
            ])
            this.listUsers();

        }, () => {
            this.setShowUserInfo(false);
            this.authService.signOut();
        })
    }

    setShowUserInfo(isShow: boolean) {
        this.isShowUserInfo = isShow;
    }

    getAccessToken() {
        return this.authService.getToken();
    }

    async listUsers() {
        let token = this.getAccessToken(),
            observable = await this.appService.getUsersList(token);

        observable.subscribe((list) => {
            this.usersList = list;
        })
    }

    giveCoins() {
        if (this.giveCoinsForm.valid && this.currentUser.valid && this.getMaxGiveCoins()) {
            this.appService.giveCoins(
                this.getAccessToken(),
                this.currentUser.value.email,
                this.presentCoins.value).subscribe(
                (user: IUser) => {
                    if (user) {
                        this.coins = user.coin;
                        this.presentCoins.setValidators([
                            Validators.min(1),
                            Validators.max(this.getMaxGiveCoins())
                        ])
                    }
                }, error => {
                    console.log('error', error);
                });
        }
    }

    getMaxGiveCoins() {
        return this.coins > 0 ? this.coins : 0;
    }

    isShowGiveCoinsForm() {
        return this.coins > 0
    }
}
