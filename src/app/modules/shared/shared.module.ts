import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, MatButtonModule, MatInputModule, MatTableModule, MatSortModule],
})
export class SharedModule {
  static ascending: boolean = false;


  static sort(arr: any[], sortBy: string) {
    this.ascending = !this.ascending;
    if (typeof arr[0][sortBy] === 'number') {
      this.ascending
        ? arr.sort((a, b) => a[sortBy] - b[sortBy])
        : arr.sort((a, b) => b[sortBy] - a[sortBy]);
    } else {
      this.ascending
        ? arr.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        : arr.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
    }
  }
}
