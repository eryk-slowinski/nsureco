import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent implements AfterViewInit {

  @Input()
  data: any[] = [];
  @Input()
  filteredValues: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [];
  filterControls: FormControl[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.displayedColumns = Object.getOwnPropertyNames(this.filteredValues);
    this.filterControls = [];

    let arr = Object.getOwnPropertyNames(this.filteredValues);
    arr.forEach(key => {
      this.filterControls.push(new FormControl());
      this.filterControls[this.filterControls.length - 1].valueChanges.subscribe((filterValue) => {
        this.filteredValues[key] = filterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
    console.log(this.filteredValues);

  }

  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      let arr = Object.getOwnPropertyNames(data);
      let booleanArr: Boolean[] = [];

      arr.forEach(key => {

        if (isNaN(data[key])) {

          booleanArr.push(data[key].toString().trim().indexOf(searchString[key]) !== -1)
        } else if (data[key] == null) { }
        else {

          booleanArr.push(data[key].toString().trim().toLowerCase().indexOf(isNaN(searchString[key]) ? searchString[key] !== -1 : searchString[key].toLowerCase()) !== -1)
        }
      });



      let prevStatement = booleanArr[0];

      for (var i = 1; i < booleanArr.length; i++) {
        prevStatement = prevStatement && booleanArr[i];
        if (!prevStatement) {
          return false;
        }
      }
      return true;
    }
    return myFilterPredicate;
  }

}
