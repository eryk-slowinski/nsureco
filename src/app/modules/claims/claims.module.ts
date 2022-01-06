import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { EditClaimComponent } from './edit-claim/edit-claim.component';



@NgModule({
  declarations: [
    CreateClaimComponent,
    EditClaimComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClaimsModule { }
