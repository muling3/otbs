import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingModel } from '../../models/booking.model';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private bookingService: BookingService, private userService: UserService) { }

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
        console.log(this.pendingBookings.length)
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

}
