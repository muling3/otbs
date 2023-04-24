import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

interface PassengerModel {
  pass_name: string;
  pass_gender: string;
  pass_age: string;
}

@Component({
  selector: 'app-passenger.page',
  templateUrl: './passenger.page.component.html',
  styleUrls: ['./passenger.page.component.scss'],
})
export class PassengerPageComponent implements OnInit {
  constructor(private bookingService: BookingService, private route: Router) {}

  @ViewChild('passengerForm') passengerForm!: NgForm;

  username: string = '';
  placeholderId: string = '';
  numberOfPassengers: number = 0;
  passengersDummyArray: number[] = [];
  ngOnInit(): void {
    this.username = localStorage.getItem('user') as string;
    this.placeholderId = localStorage.getItem('id') as string;
    this.numberOfPassengers = parseInt(localStorage.getItem('np') as string);
    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.passengersDummyArray[i] = i;
    }
  }

  passengersDetailsArray: PassengerModel[] = [];
  passengersSubmit(): void {
    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.passengersDetailsArray[i] = {
        pass_gender: this.passengerForm.value[`pass_gender_${i}`],
        pass_age: this.passengerForm.value[`pass_age_${i}`],
        pass_name: this.passengerForm.value[`pass_name_${i}`],
      };
    }

    //updating passengers array
    this.bookingService
      .updatePlaceholderAddPassengers(
        this.passengersDetailsArray,
        this.placeholderId
      )
      .subscribe((data) => {
        //creating contact and addreess
        this.bookingService
          .updatePlaceholder(
            {
              contact: this.passengerForm.value[`contact`],
              address: this.passengerForm.value[`address`],
            },
            this.placeholderId
          )
          .subscribe((data) => {
            this.route.navigate(['/payment']);
          });
      });
  }
}
