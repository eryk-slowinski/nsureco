import { Component, OnInit } from '@angular/core';
import { ObjectRiskConfig } from 'src/app/models/objectRiskConfig';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-object-risks',
  templateUrl: './object-risks.component.html',
  styleUrls: ['./object-risks.component.css']
})
export class ObjectRisksComponent implements OnInit {
  constructor(public policyService: PolicyService) { }

  risks: ObjectRiskConfig[] = [];
  newRisk: ObjectRiskConfig = new ObjectRiskConfig();
  editState: boolean = false;

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

  async setRisk(risk: ObjectRiskConfig) {
    this.newRisk = risk;
  }

}
