import { EditPolicyComponent } from './modules/policies/edit-policy/edit-policy.component';
import { SearchCustomerComponent } from './modules/customers/search-customer/search-customer.component';
import { CreateCustomerComponent } from './modules/customers/create-customer/create-customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePolicyComponent } from './modules/policies/create-policy/create-policy.component';
import { SearchPolicyComponent } from './modules/policies/search-policy/search-policy.component';
import { UserLoginComponent } from './modules/users/user-login/user-login.component';
import { HomeComponent } from './modules/core/home/home.component';
import { CustomerComponent } from './modules/customers/customer/customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'userlogin', pathMatch: 'full' },
  { path: 'userlogin', component: UserLoginComponent },
  //COMMENTED FOR TESTING PURPOSES
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'searchpolicy', component: SearchPolicyComponent, canActivate: [AuthGuard] },
  // { path: 'createpolicy', component: CreatePolicyComponent, canActivate: [AuthGuard] },
  // { path: 'editpolicy', component: EditPolicyComponent, canActivate: [AuthGuard] },
  // { path: 'createcustomer', component: CreateCustomerComponent, canActivate: [AuthGuard] },
  // { path: 'searchcustomer', component: SearchCustomerComponent, canActivate: [AuthGuard] },
  // { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'createpolicy', component: CreatePolicyComponent },
  { path: 'searchpolicy', component: SearchPolicyComponent },
  { path: 'editpolicy', component: EditPolicyComponent },
  { path: 'createcustomer', component: CreateCustomerComponent },
  { path: 'searchcustomer', component: SearchCustomerComponent },
  { path: 'customer', component: CustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
