import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { GaugeModule } from 'angular-gauge';

@NgModule({
  declarations: [
    AppComponent,DashboardComponent, CartComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    GaugeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
