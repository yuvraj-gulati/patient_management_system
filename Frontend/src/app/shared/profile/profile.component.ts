import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  //For showing and hiding password
  showPassword: boolean = false;
  maskedPassword : string = "xxxxxxxx";

  showHidePassword(){
    this.showPassword = !this.showPassword;
  }

  
  
  userDetails : any = JSON.parse(localStorage.getItem('userDetails') || "");
}
