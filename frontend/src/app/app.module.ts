import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/components/home.page/home.page.component';
import { RoutingPageComponent } from './home/components/routing.page/routing.page.component';
import { AccomodationPageComponent } from './home/components/accomodation.page/accomodation.page.component';
import { PassengerPageComponent } from './home/components/passenger.page/passenger.page.component';
import { PaymentPageComponent } from './home/components/payment.page/payment.page.component';
import { NavbarPageComponent } from './home/components/navbar.page/navbar.page.component';
import { HeaderComponent } from './home/components/header/header.component';
import { CardsComponent } from './home/components/cards/cards.component';
import { AccountComponent } from './home/components/account/account.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RoutingPageComponent,
    AccomodationPageComponent,
    PassengerPageComponent,
    PaymentPageComponent,
    NavbarPageComponent,
    HeaderComponent,
    CardsComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
