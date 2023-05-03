import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetComponent } from "./components/reset/reset.component";
import { UpdatingPasswordComponent } from "./components/updating-password/updating-password.component";

const routes: Routes =[
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'pass-reset', component: ResetComponent},
    {path: 'reset', component: UpdatingPasswordComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRouting{}