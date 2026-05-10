import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  userLoginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', Validators.required),
  });

  //Method executed after login form is submitted
  submitUserLoginForm() {
    if (this.userLoginForm.valid) {
      console.log(this.userLoginForm.value);

      const userEmail = this.userLoginForm.value.userEmail;
      const userPassword = this.userLoginForm.value.userPassword;

      // Calling the authentication service's login method
      if (this.authService.login(userEmail, userPassword)) {
        this.toastr.success('User LoggedIn', 'Successfully!');

        this.router.navigate(['/auth/otp-verification']);
      } else {
        this.toastr.error('Wrong Credential', 'Error!');
      }
    } 
    else {
      this.toastr.error('Form not Validated', 'Error!');
    }
  }
}
