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
  ascending: boolean = false;

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
  sorting(arr: any[], sortBy: string) {
    this.sharedService.sort(arr, sortBy);
  }



}
