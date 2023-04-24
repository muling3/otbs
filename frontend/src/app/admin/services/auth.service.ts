import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = 'http://localhost:8000/users/';

   loginAdmin(request: {username: string, password: string}): Observable<UserModel> {
    return this.http.post<UserModel>(this.API_URL + 'admin', request);
  }
}
