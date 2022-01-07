import { Customers } from "src/app/models/customers";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor() { }
    public customer: Customers;
}