import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { AuthGuard } from '../guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '' , component : RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'forget', component:ForgetComponent
  },
  {
    path: 'otp-verification' , component: OtpVerificationComponent , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthRoutingModule { }
