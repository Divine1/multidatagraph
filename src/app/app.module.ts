import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { GaugeModule } from 'angular-gauge';
import {AppRoutingModule} from './app-routing.module'
@NgModule({
  declarations: [
    AppComponent,DashboardComponent, CartComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,
    GaugeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
