import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  constructor(private toastr: ToastrService, private router: Router) {}

  otp: string | undefined;



  onOtpChange(otp: string) {
    this.otp = otp;
  }

  isOtpValid(): string | boolean | undefined {
    return this.otp && this.otp.length === 6;
  }

  //Method executed after submit button is clicked to verify otp
  submitUserPasswordForgetOtpForm() {
    if (this.otp === '123456') {
      console.log(this.otp);

      this.toastr.success('OTP Verified', 'SuccessFully!');

      this.router.navigate(['/patient/dashboard']);
    } else {
      this.toastr.error('Wrong OTP', 'Error!');
    }
  }
}
