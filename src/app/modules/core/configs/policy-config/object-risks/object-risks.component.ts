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

  ngOnInit(): void {
    this.loadRisks();
  }

  async loadRisks() {
    await this.policyService
      .getAllObjectRiskConfig()
      .then((data) => (this.risks = data));
  }

  async mergeObjectRisk() {
    await this.policyService
      .mergeObjectRiskConfig(this.newRisk).then();
  }

  async setObjectRisk(risk: ObjectRisksConfig) {
    this.newRisk = risk;
    console.log(this.newRisk);
  }

}