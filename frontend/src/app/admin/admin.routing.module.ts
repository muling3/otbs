import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { TransactionComponent } from "./components/transaction/transaction.component";
import { ReservationComponent } from "./components/reservation/reservation.component";


const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'transactions', component: TransactionComponent},
    {path: 'reservations', component: ReservationComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRouting{}