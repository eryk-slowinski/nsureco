//Angular modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Pipe } from '@angular/core';
import { AppRoutingModule } from './appRoutingModule';
//Feature modules
import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { PoliciesModule } from './modules/policies/policies.module';
import { CustomersModule } from './modules/customers/customers.module';
import { CoreModule } from './modules/core/core.module';
import { LayoutModule } from './modules/layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
//Components
import { AppComponent } from './app.component';
import { FilteringPipe } from './pipes/filtering.pipe';
import { SortingPipe } from './pipes/sorting.pipe';


@NgModule({
  declarations: [AppComponent, FilteringPipe, SortingPipe],
  imports: [
    //Angular modules
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    //Feature modules
    LayoutModule,
    CoreModule,
    CustomersModule,
    PoliciesModule,
    UsersModule,
    SharedModule,
    FilteringPipe,
    SortingPipe


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
