import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PolicyConfigComponent } from './configs/policy-config/policy-config.component';
import { ClaimConfigComponent } from './configs/claim-config/claim-config.component';
import { PolicyLineTypesComponent } from './configs/policy-config/policy-line-types/policy-line-types.component';
import { ObjectRisksComponent } from './configs/policy-config/object-risks/object-risks.component';
import { ObjectFlexfieldsComponent } from './configs/policy-config/object-flexfields/object-flexfields.component';
import { PremiumCalculationComponent } from './configs/policy-config/premium-calculation/premium-calculation.component';
import { ProductsConfigComponent } from './configs/policy-config/products-config/products-config.component';
import { VehiclesComponent } from './configs/policy-config/vehicles/vehicles.component';

@NgModule({
  declarations: [HomeComponent, PolicyConfigComponent, ClaimConfigComponent, PolicyLineTypesComponent, ObjectRisksComponent, ObjectFlexfieldsComponent, PremiumCalculationComponent, ProductsConfigComponent, VehiclesComponent],
  exports: [HomeComponent],
  imports: [CommonModule, SharedModule],
})
export class CoreModule { }
