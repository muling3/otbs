import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingModel } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) {}

  private readonly API_URL: string = 'http://localhost:8000/bookings/';

  //placeholdeer service implementations
  createPlaceholder(data: BookingModel): Observable<BookingModel> {
    return this.http.post<BookingModel>(
      this.API_URL + 'placeholder/',
      data
    );
  }
  getPlaceholder(id: string) {
    return this.http.get<BookingModel>(
      this.API_URL + 'placeholder/' + id
    );
  }
  updatePlaceholder(data: BookingModel, id: string) {
    return this.http.put<BookingModel>(
      this.API_URL + 'placeholder/' + id,
      data
    );
  }
  clearPlaceholder(id: string) {
    return this.http.delete<BookingModel>(
      this.API_URL + 'placeholder/' + id
    );
  }

}
