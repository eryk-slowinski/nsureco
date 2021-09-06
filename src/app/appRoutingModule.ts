import { AuthGuard } from './guards/auth.guard';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CreatePolicyComponent } from "./components/create-policy/create-policy.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: '', redirectTo:'userlogin', pathMatch:'full' },
    { path: 'userlogin', component: UserLoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'createpolicy', component: CreatePolicyComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRoutingModule {}
