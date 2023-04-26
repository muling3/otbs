import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminRouting } from './admin.routing.module';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ReservationComponent } from './components/reservation/reservation.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';

import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    TransactionComponent,
    ReservationComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AdminRouting,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class AdminModule {}
