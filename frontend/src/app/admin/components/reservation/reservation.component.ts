import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';
import { UserModel } from 'src/app/home/models/user.model';
import { BookingModel } from 'src/app/home/models/booking.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog
  ) {}

  username: string = '';
  pendingBookings: BookingModel[] = [];

  ngOnInit(): void {
    this.username = localStorage.getItem('user') as string;
    // pending bookings
    this.bookingService.pendingBookings().subscribe((data) => {
      if (data) {
        this.pendingBookings = data;
      }
    });
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        from: this.pendingBookings[index].departure,
        to: this.pendingBookings[index].destination,
        travelDate: this.pendingBookings[index].travel_date,
        travelTime: this.pendingBookings[index].travel_time,
        accomodation: this.pendingBookings[index].accomodation,
        passengers: this.pendingBookings[index].passengers,
        fare: this.pendingBookings[index].fare,
        id: this.pendingBookings[index]._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //reset pending bookings
      this.bookingService.pendingBookings().subscribe((data) => {
        if (data) {
          this.pendingBookings = data;
        }
      });
    });
  }
}
