import { Component, OnInit } from '@angular/core';
import { PremiumCalcConfigHeaders } from 'src/app/models/premiumCalcConfigHeaders';
import { PremiumCalcConfigValues } from 'src/app/models/premiumCalcConfigValues';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-premium-calculation',
  templateUrl: './premium-calculation.component.html',
  styleUrls: ['./premium-calculation.component.css']
})
export class PremiumCalculationComponent implements OnInit {

  constructor(public policyService: PolicyService) { }

  headers: PremiumCalcConfigHeaders[] = [];
  values: PremiumCalcConfigValues[] = [];
  newHeader: PremiumCalcConfigHeaders = new PremiumCalcConfigHeaders();
  newValue: PremiumCalcConfigValues = new PremiumCalcConfigValues();
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

  async setHeaderConfig(header: PremiumCalcConfigHeaders) {
    this.newHeader = header;
  }
  async setValueConfig(value: number) {
    this.values.forEach(element => {
      if (element.id === value) {
        this.newValue = element;
      }
    });
  }
}
