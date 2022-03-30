import { Component, OnInit } from '@angular/core';
import { ProductConfig } from 'src/app/models/productConfig';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-products-config',
  templateUrl: './products-config.component.html',
  styleUrls: ['./products-config.component.css']
})
export class ProductsConfigComponent implements OnInit {

  constructor(public policyService: PolicyService) { }

  products: ProductConfig[] = [];
  newProduct: ProductConfig;
  editState: boolean = false;
  data;
  filteredValues: any = { id: "", productId: "", startDate: "", endDate: "", version: "" };

  ngOnInit(): void {
    this.loadProductConfig();
  }

  async loadProductConfig() {
    await this.policyService
      .getProductConfig().then((data) => (this.products = data));
    this.data = this.products;
  }

  async mergeProductConfig() {
    await this.policyService
      .mergeProductConfig(this.newProduct).then();
  }

  async setProductConfig(product: ProductConfig) {
    this.newProduct = product;
  }
}
