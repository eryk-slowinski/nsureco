import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePolicyComponent } from './create-policy/create-policy.component';
import { SharedModule } from '../shared/shared.module';
import { SearchPolicyComponent } from './search-policy/search-policy.component';
import { EditPolicyComponent } from './edit-policy/edit-policy.component';

@NgModule({
  declarations: [CreatePolicyComponent, SearchPolicyComponent, EditPolicyComponent],
  exports: [CreatePolicyComponent],
  imports: [CommonModule, SharedModule],
})
export class PoliciesModule {}
