import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {getPort} from "../../../config";

@Injectable()
export class AppService {

    port = getPort();

    constructor(private httpClient: HttpClient) {
    }

    async getUsersList(access_token) {
        let url = this.port.concat('/user/list');

        return this.httpClient.get(url, {
            headers: this.getHttpHeaders(access_token)
        });
    }

    async getUser(access_token) {
        let url = this.port.concat('/user');

        return this.httpClient.get(url, {
            headers: this.getHttpHeaders(access_token)
        });
    }

    validateUser(access_token: string) {
        let url = this.port.concat('/auth/google');

        return this.httpClient.get(url, {
            headers: this.getHttpHeaders(access_token)
        });
    }

    giveCoins(access_token: string, recipientEmail: string, coins: number) {
        let url = this.port.concat('/coin/present');

        return this.httpClient.put(url, {
            recipientEmail: recipientEmail,
            coins: coins
        }, {
            headers: this.getHttpHeaders(access_token)
        })
    }

    addCoins(access_token: string, currentUserEmail: string, coins: number){
        let url = this.port.concat('/coin/add');

        return this.httpClient.put(url, {
            userEmail: currentUserEmail,
            coins: coins
        }, {
            headers: this.getHttpHeaders(access_token)
        })
    }

    removeUser(access_token: string, userEmail: string) {
        let url = this.port.concat("/user/remove"),
            params = new HttpParams().set('userEmail', userEmail);

        return this.httpClient.delete(url, {
            headers: this.getHttpHeaders(access_token),
            params: params
        });
    }

    getHttpHeaders(access_token) {
        return new HttpHeaders({
            'Access-Control-Allow-Origin': this.port,
            'Authorization': `Bearer ${access_token}`
        })
    }
}
