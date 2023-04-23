import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminRouting } from './admin.routing.module';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ReservationComponent } from './components/reservation/reservation.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    TransactionComponent,
    ReservationComponent,
  ],
  imports: [CommonModule, AdminRouting, MatTableModule, MatPaginatorModule],
})
export class AdminModule {}
