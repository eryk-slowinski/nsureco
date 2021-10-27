import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePolicyComponent } from './create-policy/create-policy.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreatePolicyComponent],
  exports: [CreatePolicyComponent],
  imports: [CommonModule, SharedModule],
})
export class PoliciesModule {}
