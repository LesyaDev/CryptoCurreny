import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AppGuardService} from "./services/app.guard.service";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AppGuardService],
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AppGuardService],
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: '/admin',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AppGuardService]
})
export class AppRoutingModule {
}
