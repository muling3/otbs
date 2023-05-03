import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { HeaderComponent } from './components/header/header.component';
import { UpdatingPasswordComponent } from './components/updating-password/updating-password.component';
import { AuthRouting } from './auth.routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    HeaderComponent,
    UpdatingPasswordComponent,
  ],
  imports: [CommonModule, AuthRouting, FormsModule, HttpClientModule],
})
export class AuthModule {}
