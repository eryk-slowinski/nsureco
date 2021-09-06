import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutingModule } from './appRoutingModule';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
//Components
import { AppComponent } from './app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { CreatePolicyComponent } from './components/create-policy/create-policy.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    CreatePolicyComponent,
    UserLoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    appRoutingModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }