import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent {
  constructor(private toastr: ToastrService) {}

  userPasswordForgetForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
  });

  //Method executed after login form is submitted
  submitUserPasswordForgetForm() {
    if (this.userPasswordForgetForm.valid) {
      console.log(this.userPasswordForgetForm.value);

      const userEmailLocalStorage = JSON.parse(
        localStorage.getItem('userDetails') || ''
      );
      const userEmail = this.userPasswordForgetForm.value.userEmail;

      if (userEmail === userEmailLocalStorage.userEmail) {
        this.toastr.success('Send OTP to your email', 'SuccessFully!');
      }
      else{
        this.toastr.error('Please use correct email', 'Error!');
      }

      this.userPasswordForgetForm.reset();
    } 
    else{
      this.toastr.error('Form not Validated', 'Error!');
    }
  }
}
