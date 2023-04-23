import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthRouting } from './auth.routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule, AuthRouting
  ]
})
export class AuthModule { }
