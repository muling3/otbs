import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL: string = 'http://localhost:8000/users/';

  constructor(private http: HttpClient) { }

  //getUserByUsername
  getUserByUsername(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(
      this.API_URL + username
    );
  }
}
