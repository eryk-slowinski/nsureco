import { PolicyLineTypeConfig } from 'src/app/models/policyLineTypeConfig';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy.service';
import { SharedService } from 'src/app/services/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-policy-line-types',
  templateUrl: './policy-line-types.component.html',
  styleUrls: ['./policy-line-types.component.css']
})
export class PolicyLineTypesComponent implements OnInit, AfterViewInit {
  constructor(public policyService: PolicyService, public sharedService: SharedService) { }

  productLines: PolicyLineTypeConfig[] = [];

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'productId', 'policyLineType', 'version'];


  @ViewChild(MatSort)
  sort!: MatSort;


  async loadPolicyLineTypeConfig() {
    await this.policyService.getAllPolicyLines().then((data) => (this.productLines = data));
    this.dataSource = new MatTableDataSource(this.productLines);
    this.dataSource.sort = this.sort;


  }
  ngOnInit(): void {


  }
  ngAfterViewInit(): void {
    this.loadPolicyLineTypeConfig();

  }




}

