import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormRecord,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  //Variable used to show and hide the password
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  //Function used to toggle the showPassword variable
  passwordShowHide() {
    this.showPassword = !this.showPassword;
  }

  confirmPasswordShowHide() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  registerUserForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
      ]),
      userDOB: new FormControl('', Validators.required),
      userPhone: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
      userConfirmPassword: new FormControl('', Validators.required),
      userGender: new FormControl('', Validators.required),
      userAddress: new FormControl('', Validators.required),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  passwordMatchValidator(control: AbstractControl) {
    // return control.get('userPassword')?.value === control.get('userConfirmPassword') ? null : { mismatch : true }

    const password = control.get('userPassword');
    const confirmPassword = control.get('userConfirmPassword');

    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        confirmPassword.setErrors(null);
        return null;
      }
    } else {
      return null;
    }
  }

  //Method to restrict the user selecting the date after the current date
  getMaxDate(): string {
    const currentDate = new Date();

    // Format the current date as YYYY-MM-DD (required format for the max attribute)
    const formattedDate = currentDate.toISOString().split('T')[0];

    return formattedDate;
  }

  //Method executed after register form is submitted
  onSubmitForm() {
    if (this.registerUserForm.valid) {
      localStorage.setItem(
        'userDetails',
        JSON.stringify(this.registerUserForm.value)
      );

      const UserModelDto = {
        UserName : this.registerUserForm.value.username,
        UserEmail : this.registerUserForm.value.userEmail,
        UserDob : this.registerUserForm.value.userDOB,
        UserPhone : this.registerUserForm.value.userPhone,
        UserGender: this.registerUserForm.value.userGender,
        UserAddress : this.registerUserForm.value.userAddress,
        UserPassword : this.registerUserForm.value.userPassword,
        UserConfirmPassword : this.registerUserForm.value.userConfirmPassword
      }

      this.authService.registerUser(UserModelDto).subscribe({
        next: (data) => {
          if (data.success) {
            this.toastr.success(`${data.message}`, 'Successfully!');
            this.router.navigate(['/auth/login']);
          }
        },
        error: (error) => {
          if (error.error && error.error.message) {
            this.toastr.error(error.error.message, 'Error!');
          } 
          else {
            this.toastr.error('An unexpected error occurred.', 'Error!');
          }
        }
      });
    }
    else {
      this.toastr.error('Form not Validated', 'Error!');
    }
  }
}
