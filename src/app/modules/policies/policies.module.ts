import { PolicyComponent } from './policy/policy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePolicyComponent } from './policy/create-policy/create-policy.component';
import { SharedModule } from '../shared/shared.module';
import { EditPolicyComponent } from './policy/edit-policy/edit-policy.component';

@NgModule({
  declarations: [CreatePolicyComponent, EditPolicyComponent],
  exports: [CreatePolicyComponent, EditPolicyComponent],
  imports: [CommonModule, SharedModule],
})
export class PoliciesModule { }
