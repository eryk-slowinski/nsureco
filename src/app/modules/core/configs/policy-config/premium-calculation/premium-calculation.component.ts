import { Component, OnInit } from '@angular/core';
import { PremiumCalcConfigHeader } from 'src/app/models/premiumCalcConfigHeader';
import { PremiumCalcConfigValue } from 'src/app/models/premiumCalcConfigValue';
import { PolicyService } from 'src/app/services/policy.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-premium-calculation',
  templateUrl: './premium-calculation.component.html',
  styleUrls: ['./premium-calculation.component.css']
})
export class PremiumCalculationComponent implements OnInit {

  constructor(public policyService: PolicyService, public sharedService: SharedService) { }

  headers: PremiumCalcConfigHeader[] = [];
  values: PremiumCalcConfigValue[] = [];
  newHeader: PremiumCalcConfigHeader = new PremiumCalcConfigHeader();
  newValue: PremiumCalcConfigValue = new PremiumCalcConfigValue();
  editState: boolean = false;

  ngOnInit(): void {
    this.loadHeadersConfig();
    this.loadValuesConfig();
  }

  async loadHeadersConfig() {
    await this.policyService
      .getAllPremiumCalcHeaders()
      .then((data) => (this.headers = data));
    this.newHeader = this.headers[0];
  }

  async loadValuesConfig() {
    await this.policyService
      .getAllPremiumCalcValues()
      .then((data) => (this.values = data));
    this.newValue = this.values[0];
  }

  async mergeHeaderConfig() {
    await this.policyService
      .mergePremiumCalcHeadersConfig(this.newHeader).then();
  }

  async setHeaderConfig(header: PremiumCalcConfigHeader) {
    this.newHeader = header;
  }
  async setValueConfig(value: number) {
    this.values.forEach(element => {
      if (element.id === value) {
        this.newValue = element;
      }
    });
  }
  sorting(arr: any[], sortBy: string) {
    this.sharedService.sort(arr, sortBy);
  }
}
