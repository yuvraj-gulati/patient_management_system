import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Interface/IUser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Authenticated_Token';

  constructor(private http : HttpClient) { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }
  
  login(userEmail: string|null|undefined, password: string|null|undefined): boolean {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || "");

    const userEmailLocalStorage = userDetails.userEmail;
    const userPasswordLocalStorage = userDetails.userPassword;

    if(userEmailLocalStorage === undefined){
      return false;
    }

    if (userEmail === userEmailLocalStorage && password === userPasswordLocalStorage) {
      const authToken = 'Authorized';
      
      //Removing  password from local storage 
      // localStorage.removeItem('userEmail');
      // localStorage.removeItem('userPassword');

      //Setting token in local storage from this user will be validated for protected routes
      localStorage.setItem(this.authSecretKey, authToken);
      this.isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
  }


  registerUser(user : any) : Observable<any>{
    return this.http.post<any>('https://localhost:44317/api/User/RegisterUser' , user);
  }

}
