import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CreatePolicyComponent } from "./components/create-policy/create-policy.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: '', redirectTo:'userlogin', pathMatch:'full' },
    { path: 'userlogin', component: UserLoginComponent },
    //COMMENTED FOR TESTING PURPOSES
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'createpolicy', component: CreatePolicyComponent, canActivate: [AuthGuard] },
    // { path: 'createcustomer', component: CreateCustomerComponent, canActivate: [AuthGuard] },
    // { path: 'searchcustomer', component: SearchCustomerComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'createpolicy', component: CreatePolicyComponent },
    { path: 'createcustomer', component: CreateCustomerComponent },
    { path: 'searchcustomer', component: SearchCustomerComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRoutingModule {}
