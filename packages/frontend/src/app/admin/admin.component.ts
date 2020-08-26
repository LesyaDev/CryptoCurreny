import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {AppService} from "../services/app.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogWindowComponent, setContentQuestion} from "../dialog-window/dialog-window.component";

export interface IUser {
    email: string,
    name: string,
    coin: string,
    index?: string,
    action?: any,
}

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
    dataSource;
    isShowTable: boolean = false;
    displayedColumns: string[] = ['name', 'coin', 'action', 'delete'];
    headerColumns = ['Username', 'Coins', 'Action', 'Delete'];
    usersList: IUser[];
    mainFormGroup: FormGroup;
    tableFormArray: FormArray;
    rowFormGroup: FormGroup;


    constructor(private appService: AppService, private authService: AuthService,
                private  formBuilder: FormBuilder,
                public dialog: MatDialog) {
        const access_token = this.authService.getToken();

        this.appService.getUsersList(access_token).then(
            (res) => {
                res.subscribe(list => {
                    this.isShowTable = true;
                    this.setUsersList(list);
                    this.setFormArray();
                }, () => {
                    this.isShowTable = false;
                    this.authService.signOut();
                });
            });
    }

    ngOnInit() {
        this.setFormArray();
    }

    setFormArray() {
        let usersList = this.usersList;

        this.tableFormArray = new FormArray([]);
        if (usersList) {
            for (let index = 0; index < usersList.length; index++) {
                let user = usersList[index];
                this.rowFormGroup = new FormGroup({
                    userName: new FormControl(user.name),
                    userCoin: new FormControl(user.coin),
                    addCoinForm: new FormControl('', [
                        Validators.required,
                        Validators.min(1),
                        Validators.max(100)
                    ])

                });
                this.tableFormArray.push(this.rowFormGroup);
            }

            this.mainFormGroup = this.formBuilder.group({
                tableFormArray: this.tableFormArray
            });
        }
    }

    setUsersList(list) {
        this.usersList = [];
        for (let key in list) {
            if (list.hasOwnProperty(key)) {
                let user = list[key];

                this.usersList.push({
                    email: user.email,
                    name: user.name,
                    coin: user.coin,
                    index: key

                })
            }
        }
    }

    addCoinsToUser(user: AbstractControl, index: number) {
        console.log('add coins to user', user, index);
        if (user.valid) {
            let coin = user.get('addCoinForm').value;
            let name = user.get('userName').value;
            let email = this.getUserInfo(index).email;
            setContentQuestion(`Are you really added ${coin} coins to ${name}?`);
            let dialogRes = this.dialog.open(DialogWindowComponent);

            dialogRes.afterClosed().subscribe(result => {
                if (result) {
                    let access_token = this.authService.getToken();
                    this.appService.addCoins(access_token, email, coin).subscribe((profileUser: IUser) => {
                        if (profileUser.email == email) {
                            this.usersList[index].coin = profileUser.coin
                            user.get('userCoin').setValue(profileUser.coin);
                        }
                    });
                    user.get('addCoinForm').setValue('');

                }
            })
        }
    }

    getUserInfo(index) {
        return this.usersList[index];
    }

    dialogDeleteUser(index) {
        setContentQuestion('Are you want remove this user?');
        let dialogRes = this.dialog.open(DialogWindowComponent);

        dialogRes.afterClosed().subscribe(result => {
            if (result) {
                this.deleteUser(index);
            }
        })
    }

    deleteUser(index) {
        let access_token = this.authService.getToken();
        this.appService.removeUser(access_token, this.getUserInfo(index).email).subscribe(
            (list) => {
                if (list) {
                    this.usersList.slice(index, 1);
                    this.tableFormArray.removeAt(index);
                }

            }, error => {
                console.log('error', error);
            });
    }

    get getFormControls() {
        return this.mainFormGroup.get('tableFormArray') as FormArray;
    }
}
