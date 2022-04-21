import { Component, OnInit } from '@angular/core';
import { InsuredObject } from 'src/app/models/insuredObject';
import { Policy } from 'src/app/models/policy';
import { PolicyLine } from 'src/app/models/policyLine';
import { Transaction } from 'src/app/models/transaction';
import { Vehicle } from 'src/app/models/vehicle';
import { Vehicles } from 'src/app/models/vehicles';
import { VehicleTypeConfig } from 'src/app/models/vehicleTypeConfig';
import { ObjectComponent } from '../../object/object.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends ObjectComponent implements OnInit {
  vehicleTypeConfig: VehicleTypeConfig[] = [];
  vehicles: Vehicles = new Vehicles();
  transaction: Transaction = new Transaction();
  vehicleId: number;
  customerSelected: any;
  driverCreated: boolean = false;
  vehicleCreated: boolean = false;
  vehicle: Vehicle = new Vehicle();
  policy: Policy = new Policy();
  policyLine: PolicyLine = new PolicyLine();
  driverObject: InsuredObject = new InsuredObject();
  vehicleObject: InsuredObject = new InsuredObject();

  inputs: any[] = [
    { inputType: 'text', labelFor: 'VIN', labelText: 'Please enter VIN:', assignTo: 'c01' },
    { inputType: 'text', labelFor: 'REG', labelText: 'Please enter registration number:', assignTo: 'c02' },
    { inputType: 'date', labelFor: 'date', labelText: 'Please enter date of manufacturing:', assignTo: 'd01' },
    { inputType: 'text', labelFor: 'mileage', labelText: 'Please enter milease:', assignTo: 'n04' },
    { inputType: 'text', labelFor: 'value', labelText: 'Please enter value of a vehicle:', assignTo: 'n02' }
  ]

  assignValue(event, assignTo) {
    this.vehicleObject[assignTo] = event;
  }

  async getVehicleTypes(policyLine: PolicyLine) {
    await this.policyService
      .getVehicleTypes(policyLine)
      .then((data) => (this.vehicleTypeConfig = data));
  }

  async chooseVeh(vehicleProperties: string = 'brand') {
    switch (vehicleProperties) {
      case 'brand': {
        this.vehicle.brand = null;
        this.vehicle.vehicleModel = null;
        this.vehicle.generation = null;
        this.vehicle.engineType = null;
        this.vehicle.engine = null;
        break;
      }
      case 'vehicleModel': {
        this.vehicle.vehicleModel = null;
        this.vehicle.generation = null;
        this.vehicle.engineType = null;
        this.vehicle.engine = null;
        break;
      }
      case 'generation': {
        this.vehicle.generation = null;
        this.vehicle.engineType = null;
        this.vehicle.engine = null;
        break;
      }
      case 'engineType': {
        this.vehicle.engineType = null;
        this.vehicle.engine = null;
        break;
      }
      case 'engine': {
        this.vehicle.engine = null;
        break;
      }
    }
    await this.policyService.getVehicles(this.vehicle).then((data) => {
      this.vehicles[vehicleProperties] = data;
      if (this.vehicles['vehicleId']) {
        this.vehicleId = this.vehicles['vehicleId'][0];
      }
    })
  }

  async createObjects() {
    this.createRequiredObjects().then(ar => {
      this.objects = ar; console.log(ar);
    });
    await this.delay(2000); //znalezc rozwiazanie

    console.log(this.objects.length);

    if (this.objects.length > 0) {
      console.log('eeee');
      this.objects.forEach(obj => {
        console.log('ddd');
        console.log(obj);
        console.log(this.objects);

        if (obj.type === 'DRI') {
          console.log('ccc');

          console.log(obj);

          this.driverObject = obj;
          this.driverObject.n01 = this.customerSelected['id'];
          this.policyService.updateInsuredObject(this.driverObject);
        } else if (obj.type === 'VEH') {
          this.vehicleObject = obj;
          this.vehicleObject.n01 = this.vehicleId;
          this.policyService.updateInsuredObject(this.vehicleCreated);
          this.createRisks(this.vehicleObject);
        }
      });
    }

  }

  ngOnInit(): void {
    this.getVehicleTypes(this.policyLine);
  }
}
