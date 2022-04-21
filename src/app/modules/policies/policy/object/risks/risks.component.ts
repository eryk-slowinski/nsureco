import { Component, Input, OnInit } from '@angular/core';
import { InsuredObject } from 'src/app/models/insuredObject';
import { ObjectRisk } from 'src/app/models/objectRisk';
import { ObjectRiskConfig } from 'src/app/models/objectRiskConfig';
import { Policy } from 'src/app/models/policy';
import { PolicyLine } from 'src/app/models/policyLine';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.css']
})
export class RisksComponent implements OnInit {
  constructor(public policyService: PolicyService) { }

  @Input()
  insuredObject: InsuredObject;
  @Input()
  risks: ObjectRisk[] = [];
  @Input()
  policy: Policy;
  @Input()
  policyLine: PolicyLine;
  @Input()
  objectRisksConfig: ObjectRiskConfig[] = [];
  requiredRisks: ObjectRisk[] = [];
  totalPremium: number;
  risk: ObjectRisk;
  displayStyle: string = 'none';
  statuses: string[] = ['quotation', 'policy'];


  async calculation(insuredObject: InsuredObject) {
    console.log(insuredObject);

    let totalPremium = 0;
    this.risks.forEach((risk) => {
      risk.premium = null;
      risk.premiumForPeriod = null;
    })
    await this.policyService.calculation(this.policy);
    await this.reloadCoverages(insuredObject);
    this.risks.forEach((risk) => {
      if (risk.premium != NaN)
        totalPremium += risk.premium;
    })
    this.totalPremium = totalPremium;
  }

  async reloadCoverages(object: InsuredObject) {
    console.log(object);

    this.risks = await this.policyService.getRisks(object);
    this.risks.sort((a, b) => a.riskId.localeCompare(b.riskId));
  }

  async openPopup() {
    this.requiredRisks = [];
    this.objectRisksConfig.forEach(or => {
      this.risks.forEach(risk => {
        if (risk.riskId == or.riskId) {
          if (risk.isSelected == 'false' && or.required.toString() == 'true') {
            this.requiredRisks.push(risk);
          }
        }
      })
    });
    await this.calculation(this.insuredObject);
    this.displayStyle = "block";
  }

  async completePolicy() {
    await this.updatePolicy();
    this.displayStyle = "none";
  }
  async closePopup() {
    this.displayStyle = "none";
  }

  async updatePolicy() {
    await this.policyService.updatePolicy(this.policy).then();
  }
  async updatePolicyLine() {
    await this.policyService.updatePolicyLine(this.policyLine);
  }


  async getRequiredRisks(insuredObject: InsuredObject) {
    this.requiredRisks = [];
    this.objectRisksConfig.forEach(or => {
      this.risks.forEach(risk => {
        if (risk.riskId == or.riskId) {
          if (risk.isSelected == 'false' && or.required.toString() == 'true') {
            this.requiredRisks.push(risk);
          }
        }
      })
    });
  }

  async toggleCoverage(riskId: string) {
    this.risks.forEach((riskFromList) => {
      if (riskFromList.riskId == riskId) {
        this.risk = riskFromList;
      }
    });
    this.risk.isSelected == 'false'
      ? (this.risk.isSelected = 'true')
      : (this.risk.isSelected = 'false');
    await this.policyService.changeCoverage(this.risk).then();
  }
  ngOnInit(): void {
  }

}
