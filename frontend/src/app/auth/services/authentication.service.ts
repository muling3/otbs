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
  loginUser(request: {username: string, password: string}): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.API_URL + 'login', request);
  }

  //register user
  registerUser(user: UserModel): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.API_URL + 'register', user);
  }

  //TODO: password reset
}
