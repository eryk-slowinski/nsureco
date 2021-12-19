import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { DbService } from 'src/app/services/db.service';
import { PolicyService } from 'src/app/services/policy.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  constructor(
    private dbService: DbService,
    private policyService: PolicyService,
    private userService: AuthService,
    private customerService: CustomerService
  ) { }

  allStatuses: String[] = [];

  ngOnInit(): void {
    this.allStatuses.push("db-service: pending...");
    this.allStatuses.push("user-service: pending...");
    this.allStatuses.push("customer-service: pending...");
    this.allStatuses.push("policy-service: pending...");
    this.checkStatus(this.dbService, "db-service");
  }

  async checkStatuses() {
    this.showStatuses();
    await this.checkStatus(this.dbService, "db-service", 0);
    await this.checkStatus(this.userService, "user-service", 1);
    await this.checkStatus(this.customerService, "customer-service", 2);
    await this.checkStatus(this.policyService, "policy-service", 3);
  }

  async checkStatus(service: any, serviceName: String, currentValue: number = null) {
    let serverStatus = "";
    try {
      await service
        .checkStatus()
        .then((data) => (serverStatus = data));
      if (currentValue != null) {
        this.allStatuses[currentValue] = serverStatus;
      }
    }
    catch (e) {
      this.allStatuses[currentValue] = serviceName + " is [OFFLINE].";
    }
  }

  async showStatuses() {
    let statuses = "";
    this.allStatuses.forEach(item => {
      statuses += "\n" + item;
    })
    alert(statuses);
  }

}
