import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { PolicyService } from 'src/app/services/policy.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor(public policyService: PolicyService, public sharedService: SharedService) { }

  vehicles: Vehicle[] = [];
  newVehicle: Vehicle = new Vehicle();
  editState: boolean = false;

  ngOnInit(): void {
    this.loadVehicles();
  }

  async loadVehicles() {
    await this.policyService
      .getAllVehicles()
      .then((data) => (this.vehicles = data));
  }

  public async mergeVehicle() {
    await this.policyService
      .mergeVehicle(this.newVehicle).then();
  }

  async setVehicle(vehicle: Vehicle) {
    this.newVehicle = vehicle;
  }
  sorting(arr: any[], sortBy: string) {
    this.sharedService.sort(arr, sortBy);
  }

}
