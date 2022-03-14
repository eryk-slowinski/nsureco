import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [CustomerTableComponent, InputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, CustomerTableComponent, InputComponent],
})
export class SharedModule { }
