import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor(public policyService: PolicyService) { }

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

  async addVehicle() {
    await this.policyService
      .addVehicle(this.newVehicle).then();
  }

  async setVehicle(vehicle: Vehicle) {
    this.newVehicle = vehicle;
    console.log(this.newVehicle);
  }

}
