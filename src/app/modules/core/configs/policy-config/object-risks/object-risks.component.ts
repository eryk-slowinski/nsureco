import { Component, OnInit } from '@angular/core';
import { ObjectRisksConfig } from 'src/app/models/objectRisksConfig';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-object-risks',
  templateUrl: './object-risks.component.html',
  styleUrls: ['./object-risks.component.css']
})
export class ObjectRisksComponent implements OnInit {
  constructor(public policyService: PolicyService) { }

  risks: ObjectRisksConfig[] = [];
  newRisk: ObjectRisksConfig = new ObjectRisksConfig();
  editState: boolean = false;
  Filter = '';
  userInput = '';

  ngOnInit(): void {
    this.loadRisks();
  }

  async loadRisks() {
    await this.policyService
      .getAllObjectRiskConfig()
      .then((data) => (this.risks = data));
  }

  async mergeRisk() {
    await this.policyService
      .mergeObjectRiskConfig(this.newRisk).then();
  }

  async setRisk(risk: ObjectRisksConfig) {
    this.newRisk = risk;
  }

  async onRiskFilter() {
    this.userInput = this.Filter;
  }

}
