import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableTemplateComponent } from './table-template/table-template.component';
@NgModule({
  declarations: [
    TableTemplateComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatTableModule, MatFormFieldModule, MatInputModule],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, MatButtonModule, MatInputModule, MatTableModule, MatSortModule, TableTemplateComponent, MatFormFieldModule],
})
export class SharedModule {

}
