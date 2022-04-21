import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { InsuredObject } from 'src/app/models/insuredObject';
import { ObjectRisk } from 'src/app/models/objectRisk';
import { ObjectRiskConfig } from 'src/app/models/objectRiskConfig';
import { ObjectTypeConfig } from 'src/app/models/objectTypeConfig';
import { Policy } from 'src/app/models/policy';
import { PolicyLine } from 'src/app/models/policyLine';
import { PolicyLineTypeConfig } from 'src/app/models/policyLineTypeConfig';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  constructor(
    public policyService: PolicyService
  ) { }

  @Input() customerSelected: Customer = new Customer();
  @Input() policyLine: PolicyLine = new PolicyLine();
  @Input() risks: ObjectRisk[] = [];
  @Input() policy: Policy = new Policy();
  totalPremium: number = 0;
  displayStyle: string = 'none'
  requiredRisks: ObjectRisk[] = [];
  objectRisksConfig: ObjectRiskConfig[] = [];
  risk: ObjectRisk = new ObjectRisk();
  insuredObject: InsuredObject = new InsuredObject();
  objectTypeConfigs: ObjectTypeConfig[] = [];
  objects: InsuredObject[] = [];
  policyLineTypeConfig: PolicyLineTypeConfig = new PolicyLineTypeConfig();

  async getRisksConfig(object: InsuredObject) {
    await this.policyService
      .getObjectRisksConfig(object)
      .then((data) => (this.objectRisksConfig = data));
    this.objectRisksConfig.sort((a, b) =>
      a.riskId.localeCompare(b.riskId)
    );
  }

  async createRisks(insuredObject: InsuredObject) {
    console.log(insuredObject);
    await this.getRisksConfig(insuredObject);
    this.objectRisksConfig.forEach(async (element) => {
      if (element.version === this.policy.version) {
        this.risk.riskId = element.riskId;
        this.risk.objectId = insuredObject.id;
        this.risk.depositAmount = element.depositAmount;
        this.risk.isSelected = 'false';
        await this.policyService.createRisks(this.risk).then();
      }
    });
    await this.delay(300);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async reloadCoverages(object: InsuredObject) {
    this.risks = await this.policyService.getRisks(object);
    this.risks.sort((a, b) => a.riskId.localeCompare(b.riskId));
  }

  async updateInsuredObject(insuredObject: InsuredObject) {
    // this.vehicleObject.n01 = this.vehicleId;
    await this.policyService.updateInsuredObject(insuredObject).then();
  }

  async getRequiredObjects() {
    this.policyLineTypeConfig.policyLineType = this.policyLine.policyLineType;
    this.policyLineTypeConfig.version = this.policy.version;
    await this.policyService
      .getObjects(this.policyLineTypeConfig)
      .then((data) => (this.objectTypeConfigs = data));
  }

  async createRequiredObjects(): Promise<InsuredObject[]> {
    await this.getRequiredObjects();
    let newObject: InsuredObject = new InsuredObject();
    let objects = [];
    this.objectTypeConfigs.forEach(async object => {
      newObject.policyLineId = this.policyLine.id;
      newObject.transactionId = this.policy.transactionId;
      newObject.type = object.objType;
      newObject.version = this.policyLine.version; //dodac wersje
      // newObject.n01 = this.customerSelected['id'];
      newObject = await this.policyService.createInsuredObject(newObject).then();
      objects.push(newObject);
    })

    return objects;

  }

  ngOnInit(): void {
    this.getRequiredObjects();
    // this.createRequiredObjects();
  }

}
