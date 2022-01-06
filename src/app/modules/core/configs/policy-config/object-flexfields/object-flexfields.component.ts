import { Component, OnInit } from '@angular/core';
import { ObjectFlexfieldsConfig } from 'src/app/models/objectFlexfieldsConfig';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-object-flexfields',
  templateUrl: './object-flexfields.component.html',
  styleUrls: ['./object-flexfields.component.css']
})
export class ObjectFlexfieldsComponent implements OnInit {
  constructor(public policyService: PolicyService) { }

  flexfields: ObjectFlexfieldsConfig[] = [];
  newFlexfield: ObjectFlexfieldsConfig = new ObjectFlexfieldsConfig();
  editState: boolean = false;

  ngOnInit(): void {
    this.loadFlexfields();
  }

  async loadFlexfields() {
    await this.policyService
      .getAllObjectFlexfields()
      .then((data) => (this.flexfields = data));
  }

  public async mergeFlexfield() {
    await this.policyService
      .mergeObjectFlexfield(this.newFlexfield).then();
  }

  async setFlexfield(flexfield: ObjectFlexfieldsConfig) {
    this.newFlexfield = flexfield;
    console.log(this.newFlexfield);
  }

}
