import { Component, OnInit } from '@angular/core';
import {GoogleApiService} from "ng-gapi/lib/src";
import {AuthService} from "../services/auth.service";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public user: GoogleUser;
  public auth: GoogleAuth;

  constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private authService: AuthService,
        private gapiService: GoogleApiService) {

    this.gapiService.onLoad().subscribe();

    this.matIconRegistry.addSvgIcon(
    "google",
     this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/google.svg")
   );
  }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.authService.isUserSignedIn();
  }

  async signIn() {
    await this.authService.signIn();
  }
}
