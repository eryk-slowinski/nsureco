import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
//components
import { CreatePolicyComponent } from './modules/policies/policy/create-policy/create-policy.component';
import { UserLoginComponent } from './modules/users/user-login/user-login.component';
import { HomeComponent } from './modules/core/home/home.component';
import { CustomerComponent } from './modules/customers/customer/customer.component';
import { EditPolicyComponent } from './modules/policies/policy/edit-policy/edit-policy.component';
import { SearchCustomerComponent } from './modules/customers/search-customer/search-customer.component';
import { CreateCustomerComponent } from './modules/customers/create-customer/create-customer.component';
import { CreateClaimComponent } from './modules/claims/create-claim/create-claim.component';
import { EditClaimComponent } from './modules/claims/edit-claim/edit-claim.component';
import { PolicyConfigComponent } from './modules/core/configs/policy-config/policy-config.component';
import { ClaimConfigComponent } from './modules/core/configs/claim-config/claim-config.component';
import { VehiclesComponent } from './modules/core/configs/policy-config/vehicles/vehicles.component';
import { ObjectFlexfieldsComponent } from './modules/core/configs/policy-config/object-flexfields/object-flexfields.component';
import { ObjectRisksComponent } from './modules/core/configs/policy-config/object-risks/object-risks.component';
import { ProductsConfigComponent } from './modules/core/configs/policy-config/products-config/products-config.component';
import { PolicyLineTypesComponent } from './modules/core/configs/policy-config/policy-line-types/policy-line-types.component';
import { PremiumCalculationComponent } from './modules/core/configs/policy-config/premium-calculation/premium-calculation.component';

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
  { path: 'policyconfig', component: PolicyConfigComponent },
  { path: 'claimconfig', component: ClaimConfigComponent },
  { path: 'policyconfig/vehicles', component: VehiclesComponent },
  { path: 'policyconfig/objectflexfields', component: ObjectFlexfieldsComponent },
  { path: 'policyconfig/objectrisks', component: ObjectRisksComponent },
  { path: 'policyconfig/product', component: ProductsConfigComponent },
  { path: 'policyconfig/policyline', component: PolicyLineTypesComponent },
  { path: 'policyconfig/premiumcalc', component: PremiumCalculationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
