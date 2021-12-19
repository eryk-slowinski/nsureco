import { PolicyService } from 'src/app/services/policy.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-search-policy',
  templateUrl: './search-policy.component.html',
  styleUrls: ['./search-policy.component.css']
})
export class SearchPolicyComponent implements OnInit {

  constructor(private customerService: CustomerService, private policyService: PolicyService) { }
  customerSelected: Object = new Object();
  policiesList: any[]; // CHANGE ANY TO OTHER TYPE

  editPolicy(policySelected: Object) {
    this.policyService.policySelected.next(policySelected);
  }


  ngOnInit(): void {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
  }

}
