import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilteringPipePipe } from './filtering-pipe.pipe';

@NgModule({
  declarations: [FilteringPipePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, FilteringPipePipe],
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
