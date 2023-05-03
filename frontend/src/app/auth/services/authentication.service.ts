import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private readonly API_URL: string = 'http://localhost:8000/users/';

  //login user
  loginUser(request: {
    username: string;
    password: string;
  }): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.API_URL + 'login', request);
  }

  //register user
  registerUser(user: UserModel): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.API_URL + 'register', user);
  }

  //requesting reset password
  requestingResetPassword(options: {
    email: String;
  }): Observable<{ status: Boolean; message: String }> {
    return this.http.post<{ status: Boolean; message: String }>(
      this.API_URL + 'reset',
      options
    );
  }

  //password reset
  resetPassword(options: {
    new_password: String;
    old_password: String;
  }): Observable<{ status: Boolean; message: String }> {
    return this.http.post<{ status: Boolean; message: String }>(
      this.API_URL + 'pass-reset',
      options
    );
  }
}
