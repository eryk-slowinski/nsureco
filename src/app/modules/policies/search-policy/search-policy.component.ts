import { PolicyService } from 'src/app/services/policy.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Policy } from 'src/app/models/policy';

@Component({
  selector: 'app-search-policy',
  templateUrl: './search-policy.component.html',
  styleUrls: ['./search-policy.component.css']
})
export class SearchPolicyComponent implements OnInit {

  constructor(private customerService: CustomerService, private policyService: PolicyService) { }
  customerSelected: Object = new Object();
  policySelected: Object = new Object();
  policy: Policy = new Policy();
  policiesList: Policy[];

  async searchPolicy() {
    this.policy.ownerId = this.customerSelected[0];
    this.policiesList = await this.policyService.searchPolicy(this.policy).then();
  }

  editPolicy(policySelected: Object) {
    this.policyService.policySelected.next(policySelected);
  }

  ngOnInit(): void {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.policyService.policySelected.next(this.policySelected);
    this.searchPolicy()
  }

}
