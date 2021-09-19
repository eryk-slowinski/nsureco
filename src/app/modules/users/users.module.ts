import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [CommonModule, SharedModule],
  exports: [UserLoginComponent],
})
export class UsersModule {}
