import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  declarations: [
    CreateCustomerComponent,
    SearchCustomerComponent,
    CustomerComponent,
  ],
  exports: [
    CreateCustomerComponent,
    SearchCustomerComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CustomersModule { }
