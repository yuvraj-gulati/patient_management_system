import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/service/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router,  private toastr: ToastrService, private authService : AuthService){}

  logout() : void {
    this.authService.logout();
    this.toastr.success('Successfully!' , 'Logout User');
    this.router.navigate(['/login']);
  }
}
