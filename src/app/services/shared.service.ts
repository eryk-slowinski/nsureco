import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  ascending: boolean = false;


  async sort(arr: any[], sortBy: string) {
    console.log("niech zadziała");
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
