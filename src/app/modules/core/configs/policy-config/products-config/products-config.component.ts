import { Component, OnInit } from '@angular/core';
import { ProductsConfig } from 'src/app/models/productsConfig';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-products-config',
  templateUrl: './products-config.component.html',
  styleUrls: ['./products-config.component.css']
})
export class ProductsConfigComponent implements OnInit {

  constructor(public policyService: PolicyService) { }

  products: ProductsConfig[] = [];
  newProduct: ProductsConfig;
  editState: boolean = false;

  ngOnInit(): void {
    this.loadProductConfig();
  }

  async loadProductConfig() {
    await this.policyService
      .getProducts()
      .then((data) => (this.products = data));
  }

  async mergeProductConfig() {
    await this.policyService
      .mergeProductConfig(this.newProduct).then();
  }

  async setProductConfig(product: ProductsConfig) {
    this.newProduct = product;
    console.log(this.newProduct);
  }
}
