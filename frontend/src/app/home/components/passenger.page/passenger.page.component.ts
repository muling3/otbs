import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;

  username: string = '';
  placeholderId: string = '';
  numberOfPassengers: number = 0;
  passengersDummyArray: number[] = [];
  ngOnInit(): void {
    this.placeholderId = localStorage.getItem('otbs-id') as string;
    this.username = localStorage.getItem("otbs-user") as string
    if(!this.username) this.route.navigate(['/auth'])
    if(!this.placeholderId) this.route.navigate(['/'])
    if(!(localStorage.getItem('otbs-np') as String)) this.route.navigate(['/'])

    this.numberOfPassengers = parseInt(localStorage.getItem('otbs-np') as string);
    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.passengersDummyArray[i] = i;
    }
  }

  passengersDetailsArray: PassengerModel[] = [];
  passengersSubmit(): void {
    if (this.passengerForm.valid) {
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
              localStorage.removeItem('otbs-np');
              this.route.navigate(['/payment']);
            });
        });
    } else {
      this.showWarning = true;
      this.errorDisplay.nativeElement.innerHTML = `<small>All inputs are required</small>`;
      console.log(this.errorDisplay.nativeElement.textContent);
    }
  }
}
