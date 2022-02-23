import { Component, OnInit } from '@angular/core';
import { PolicyLinesConfig } from 'src/app/models/policyLinesConfig';
import { PolicyService } from 'src/app/services/policy.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-policy-line-types',
  templateUrl: './policy-line-types.component.html',
  styleUrls: ['./policy-line-types.component.css']
})
export class PolicyLineTypesComponent implements OnInit {
  constructor(public policyService: PolicyService, public sharedService: SharedService) { }

  productLines: PolicyLinesConfig[] = [];
  newProductLine: PolicyLinesConfig;
  editState: boolean = false;

  ngOnInit(): void {
    this.loadPolicyLineTypesConfig();
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

  async setPolicyLineTypeConfig(productLine: PolicyLinesConfig) {
    this.newProductLine = productLine;
  }
  sorting(arr: any[], sortBy: string) {
    this.sharedService.sort(arr, sortBy);
  }
}
