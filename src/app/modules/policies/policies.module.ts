import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePolicyComponent } from './policy/create-policy/create-policy.component';
import { SharedModule } from '../shared/shared.module';
import { EditPolicyComponent } from './policy/edit-policy/edit-policy.component';
import { VehicleComponent } from './policy/objects/vehicle/vehicle.component';
import { ObjectComponent } from './policy/object/object.component';
import { RisksComponent } from './policy/object/risks/risks.component';

@NgModule({
  declarations: [CreatePolicyComponent, EditPolicyComponent, VehicleComponent, ObjectComponent, RisksComponent],
  exports: [CreatePolicyComponent, EditPolicyComponent, VehicleComponent, ObjectComponent],
  imports: [CommonModule, SharedModule],
})
export class PoliciesModule { }
