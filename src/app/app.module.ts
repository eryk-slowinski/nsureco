import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './appRoutingModule';
import { AppComponent } from './app.component';

import { LayoutModule } from './modules/layout/layout.module';
import { CustomersModule } from './modules/customers/customers.module';
import { UsersModule } from './modules/users/users.module';
import { CoreModule } from './modules/core/core.module';
import { PoliciesModule } from './modules/policies/policies.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    LayoutModule,
    CustomersModule,
    UsersModule,
    PoliciesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
