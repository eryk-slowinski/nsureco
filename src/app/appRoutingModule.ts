import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
//components
import { CreatePolicyComponent } from './modules/policies/create-policy/create-policy.component';
import { UserLoginComponent } from './modules/users/user-login/user-login.component';
import { HomeComponent } from './modules/core/home/home.component';
import { CustomerComponent } from './modules/customers/customer/customer.component';
import { EditPolicyComponent } from './modules/policies/edit-policy/edit-policy.component';
import { SearchCustomerComponent } from './modules/customers/search-customer/search-customer.component';
import { CreateCustomerComponent } from './modules/customers/create-customer/create-customer.component';
import { CreateClaimComponent } from './modules/claims/create-claim/create-claim.component';
import { EditClaimComponent } from './modules/claims/edit-claim/edit-claim.component';

const routes: Routes = [
  { path: '', redirectTo: 'userlogin', pathMatch: 'full' },
  { path: 'userlogin', component: UserLoginComponent },
  //COMMENTED FOR TESTING PURPOSES
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'createpolicy', component: CreatePolicyComponent, canActivate: [AuthGuard] },
  // { path: 'editpolicy', component: EditPolicyComponent, canActivate: [AuthGuard] },
  // { path: 'createcustomer', component: CreateCustomerComponent, canActivate: [AuthGuard] },
  // { path: 'searchcustomer', component: SearchCustomerComponent, canActivate: [AuthGuard] },
  // { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  // { path: 'createclaim', component: CreateClaimComponent, canActivate: [AuthGuard] },
  // { path: 'editclaim', component: EditClaimComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'createpolicy', component: CreatePolicyComponent },
  { path: 'editpolicy', component: EditPolicyComponent },
  { path: 'createcustomer', component: CreateCustomerComponent },
  { path: 'searchcustomer', component: SearchCustomerComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'createclaim', component: CreateClaimComponent },
  { path: 'editclaim', component: EditClaimComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
