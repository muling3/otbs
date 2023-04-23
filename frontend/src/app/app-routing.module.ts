import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/components/home.page/home.page.component';
import { RoutingPageComponent } from './home/components/routing.page/routing.page.component';
import { AccomodationPageComponent } from './home/components/accomodation.page/accomodation.page.component';
import { PassengerPageComponent } from './home/components/passenger.page/passenger.page.component';
import { PaymentPageComponent } from './home/components/payment.page/payment.page.component';
import { AccountComponent } from './home/components/account/account.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'routing', component: RoutingPageComponent},
  {path: 'accomodation', component: AccomodationPageComponent},
  {path: 'passenger', component: PassengerPageComponent},
  {path: 'payment', component: PaymentPageComponent},
  {path: 'user', component: AccountComponent},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
