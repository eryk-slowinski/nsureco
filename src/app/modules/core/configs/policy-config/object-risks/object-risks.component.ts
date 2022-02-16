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

  async setRisk(risk: ObjectRisksConfig) {
    this.newRisk = risk;
  }
  sort(arr: any[], sortBy: string) {
    console.log("niech zadziała");
    this.ascending = !this.ascending;
    if (typeof arr[0][sortBy] === 'number') {
      this.ascending
        ? arr.sort((a, b) => a[sortBy] - b[sortBy])
        : arr.sort((a, b) => b[sortBy] - a[sortBy]);
    } else {
      this.ascending
        ? arr.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        : arr.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
    }
  }



}
