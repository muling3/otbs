import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/auth/models/user.model';
import { BookingModel } from 'src/app/home/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = 'http://localhost:8000/bookings/';

   //confirmReservation(Booking)
  confirmBooking(id: String) {
    return this.http.put<BookingModel>(
      this.API_URL + id,
      {}
    );
  }

  //pending(Booking)
  pendingBookings(): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(
      this.API_URL + 'pending'
    );
  }

  //confirmed(Booking)
  confirmedBookings(): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(
      this.API_URL + 'confirmed'
    );
  }

  //get(Booking) ::Placeholder
  getBooking(id: String): Observable<BookingModel> {
    return this.http.get<BookingModel>(
      this.API_URL + 'placeholder/' + id
    );
  }

  //end booking process
  endBooking(booking: BookingModel): Observable<BookingModel[]> {
    return this.http.post<BookingModel[]>(
      this.API_URL + '/', booking
    );
  }
  
}
