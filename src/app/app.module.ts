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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';





@NgModule({
  declarations: [AppComponent],
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
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,

    //Material modules
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
