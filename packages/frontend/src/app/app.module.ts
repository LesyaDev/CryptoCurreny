import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from "./services/auth.service";
import {AppService} from "./services/app.service";
import {web} from '../keys.json';
import {GoogleApiModule, NG_GAPI_CONFIG} from "ng-gapi/lib/src";
import {MatCardModule} from "@angular/material/card";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AppGuardService} from "./services/app.guard.service";
import {MatDividerModule} from "@angular/material/divider";
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table'
import { AdminComponent } from './admin/admin.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { DialogWindowComponent } from './dialog-window/dialog-window.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CdkColumnDef} from "@angular/cdk/table";
const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

let gapiClientConfig = {
    fetch_basic_profile: true,
    client_id: web.client_id,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    ux_mode: "popup",
    redirect_uri: web.redirect_uris[0],
    scope: defaultScope.join(" ")
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AdminComponent,
        DialogWindowComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FlexLayoutModule,
        MatTableModule,
        MatMenuModule,
        GoogleApiModule.forRoot({
                provide: NG_GAPI_CONFIG,
                useValue: gapiClientConfig
            }
        ),
        RouterModule.forRoot([{
            path: 'redirect',
            component: AppComponent
        }]),
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule
    ],
    providers: [
        AuthService,
        AppGuardService,
        AppService,
        CdkColumnDef
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
