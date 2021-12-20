import { CustomerService } from './../../../services/customer.service';
import { PolicyService } from 'src/app/services/policy.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent implements OnInit {

  constructor(private policyService: PolicyService, private customerService: CustomerService) { }
  policySelected: Object = new Object();
  customerSelected: Object = new Object();

  ngOnInit(): void {
    this.policyService.policySelected.subscribe((policy) => {
      this.policySelected = policy;
    });
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
  }

}
