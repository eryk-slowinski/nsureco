import { PolicyLineTypeConfig } from 'src/app/models/policyLineTypeConfig';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy.service';
import { SharedService } from 'src/app/services/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-policy-line-types',
  templateUrl: './policy-line-types.component.html',
  styleUrls: ['./policy-line-types.component.css']
})
export class PolicyLineTypesComponent implements AfterViewInit {
  constructor(public policyService: PolicyService, public sharedService: SharedService) { }
  newProductLine: PolicyLineTypeConfig;
  productLines: PolicyLineTypeConfig[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'productId', 'policyLineType', 'version'];
  editState: boolean = false;

  idFilter = new FormControl();
  productIdFilter = new FormControl();
  policyLineTypeFilter = new FormControl();
  versionFilter = new FormControl();
  globalFilter = '';

  filteredValues = {
    id: '',
    productId: '',
    policyLineType: '',
    version: ''
  }

  @ViewChild(MatSort)
  sort!: MatSort;


  async loadPolicyLineTypeConfig() {
    await this.policyService.getAllPolicyLines().then((data) => (this.productLines = data));
    this.dataSource = new MatTableDataSource(this.productLines);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.loadPolicyLineTypeConfig();
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);


    this.idFilter.valueChanges.subscribe((idFilterValue) => {
      this.filteredValues['id'] = idFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.productIdFilter.valueChanges.subscribe((productIdFilterValue) => {
      this.filteredValues['productId'] = productIdFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.policyLineTypeFilter.valueChanges.subscribe((policyLineTypeFilter) => {
      this.filteredValues['policyLineType'] = policyLineTypeFilter;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.versionFilter.valueChanges.subscribe((versionFilter) => {
      this.filteredValues['version'] = versionFilter;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });



    console.log(this.dataSource);
  }

  applyFilter(filter: string) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: PolicyLineTypeConfig, filter: string): boolean => {

      let searchString = JSON.parse(filter);
      console.log(searchString);
      return data.id.toString().trim().indexOf(searchString.id) !== -1 &&
        data.productId.toString().trim().toLowerCase().indexOf(searchString.productId.toLowerCase()) !== -1 &&
        data.policyLineType.toString().trim().toLowerCase().indexOf(searchString.policyLineType.toLowerCase()) !== -1 &&
        data.version.toString().trim().toLowerCase().indexOf(searchString.version.toLowerCase()) !== -1
    }
    return myFilterPredicate;
  }
  async loadPolicyLineTypesConfig() {
    await this.policyService
      .getAllPolicyLines()
      .then((data) => (this.productLines = data));
  }

  async mergePolicyLineTypeConfig() {
    await this.policyService
      .mergePolicyLineTypeConfig(this.newProductLine).then();
  }

  async setPolicyLineTypeConfig(productLine: PolicyLineTypeConfig) {
    this.newProductLine = productLine;
  }

}



