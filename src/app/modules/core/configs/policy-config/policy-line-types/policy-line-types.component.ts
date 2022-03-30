import { PolicyLineTypeConfig } from 'src/app/models/policyLineTypeConfig';
import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-policy-line-types',
  templateUrl: './policy-line-types.component.html',
  styleUrls: ['./policy-line-types.component.css']
})
export class PolicyLineTypesComponent implements OnInit {
  constructor(public policyService: PolicyService, public sharedService: SharedService) { }

  newProductLine: PolicyLineTypeConfig;
  productLines: PolicyLineTypeConfig[] = [];
  data;
  editState: boolean = false;
  filteredValues = {
    id: '',
    productId: '',
    policyLineType: '',
    version: ''
  }

  ngOnInit() {
    this.loadPolicyLineTypeConfig();
  }

  async loadPolicyLineTypeConfig() {
    await this.policyService.getAllPolicyLines().then((data) => (this.productLines = data));
    this.data = this.productLines;
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



