import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import { CreatePolicyComponent } from "./components/create-policy/create-policy.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserPanelComponent } from "./components/user-panel/user-panel.component";

const routes: Routes = [
    { path: 'userlogin', component: UserLoginComponent},
    { path: 'userpanel', component: UserPanelComponent},
    {path: 'createpolicy', component: CreatePolicyComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRoutingModule {}
export const routingComponents = [UserPanelComponent]