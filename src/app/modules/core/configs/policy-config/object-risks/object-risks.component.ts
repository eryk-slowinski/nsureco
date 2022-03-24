import { Component, OnInit } from '@angular/core';
import { ObjectRiskConfig } from 'src/app/models/objectRiskConfig';
import { PolicyService } from 'src/app/services/policy.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-object-risks',
  templateUrl: './object-risks.component.html',
  styleUrls: ['./object-risks.component.css']
})
export class ObjectRisksComponent implements OnInit {
  constructor(public policyService: PolicyService, public sharedService: SharedService) { }

  risks: ObjectRiskConfig[] = [];
  newRisk: ObjectRiskConfig = new ObjectRiskConfig();
  editState: boolean = false;
  data;
  displayedColumns: string[] = ['id', 'objectType', 'riskId', 'required', 'depositAmount', 'version'];
  filteredValues: any = { id: "", objectType: "", riskId: "", required: "", depositAmount: "", version: "" };

  ngOnInit() {
    this.loadRisks();
  }

  async loadRisks() {
    await this.policyService
      .getAllObjectRiskConfig()
      .then((data) => (this.risks = data));
    this.data = this.risks;

  }
  async mergeRisk() {
    await this.policyService
      .mergeObjectRiskConfig(this.newRisk).then();
  }
  async setRisk(risk: ObjectRiskConfig) {
    this.newRisk = risk;
  }
}
