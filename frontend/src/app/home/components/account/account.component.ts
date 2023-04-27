import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingModel } from '../../models/booking.model';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private bookingService: BookingService, private userService: UserService, private dialog: MatDialog) { }

  username: string = ''
  userObject!: UserModel
  pendingBookings: BookingModel[] = []
  approvedBookings: BookingModel[] = []
  allBookings: BookingModel[] = []

  ngOnInit(): void {
    this.username = localStorage.getItem("user") as string

    //get user object
    this.userService.getUserByUsername(this.username).subscribe(data => {
      if(data){
        this.userObject = data
      }
    })

    // pending bookings
    this.bookingService.getUserPendingBookings(this.username).subscribe(data => {
      if(data){
        this.pendingBookings = data
      }
    })

    // already confirmed bookings
    this.bookingService.getUserConfirmedBookings(this.username).subscribe(data => {
      if(data){
        this.approvedBookings = data

        this.allBookings = [...this.pendingBookings, ...this.approvedBookings]
      }
    })
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        from: this.allBookings[index].departure,
        to: this.allBookings[index].destination,
        travelDate: this.allBookings[index].travel_date,
        travelTime: this.allBookings[index].travel_time,
        accomodation: this.allBookings[index].accomodation,
        passengers: this.allBookings[index].passengers,
        fare: this.allBookings[index].fare,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
