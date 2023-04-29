import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.page.component.html',
  styleUrls: ['./routing.page.component.scss'],
})
export class RoutingPageComponent implements OnInit {
  @ViewChild('routingForm') routingForm!: NgForm;

  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;

  fare: number = 0;

  //stations
  stations: string[] = [
    'Nairobi',
    'Emali',
    'Kibwezi',
    'Mtito Andei',
    'Voi',
    'Miasenyi',
    'Mariakani',
    'Mombasa',
  ];

  todayDate: Date = new Date();
  getDate: string =
    this.todayDate.getDate().toString().length == 1
      ? '0' + this.todayDate.getDate().toString()
      : this.todayDate.getDate().toString();
  getMonth: string =
    (this.todayDate.getMonth() + 1).toString().length == 1
      ? '0' + (this.todayDate.getMonth() + 1).toString()
      : (this.todayDate.getMonth() + 1).toString();

  todayFormattedDate: string =
    this.todayDate.getFullYear() + '-' + this.getMonth + '-' + this.getDate;

  username: string = '';
  constructor(private bookingService: BookingService, private route: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('user') as string;
  }

  routingSubmit(): void {
    if (this.routingForm.valid) {
      if (
        this.routingForm.value.departure === this.routingForm.value.destination
      ) {
        // "Please choose departure and destination correctly";
        this.showWarning = true;
        this.errorDisplay.nativeElement.innerHTML = `<small>Please choose departure and destination correctly</small>`;
        console.log(this.errorDisplay.nativeElement.textContent);
        return;
      }
      this.fare = this.fareCalculator();

      //store partial to db
      this.bookingService
        .createPlaceholder({
          ...this.routingForm.value,
          fare: this.fare,
          booked_by: this.username,
        })
        .subscribe(
          (data) => {
            if (data) {
              //saving to local storage
              localStorage.setItem('id', data._id!);

              //navigating user to accomodation page
              this.route.navigate(['/accomodation']);
            }
          },
          (err) => {
            console.log('error', err);
            this.showWarning = true;
            this.errorDisplay.nativeElement.innerHTML = `<small>${err.error.message}</small>`;
            console.log(this.errorDisplay.nativeElement.textContent);
          }
        );
    } else {
      this.showWarning = true;
      this.errorDisplay.nativeElement.innerHTML = `<small>All inputs are required</small>`;
      console.log(this.errorDisplay.nativeElement.textContent);
    }
  }

  fareCalculator(): number {
    if (
      (this.routingForm.value.departure === 'Mombasa' &&
        this.routingForm.value.destination === 'Nairobi') ||
      (this.routingForm.value.departure === 'Nairobi' &&
        this.routingForm.value.destination === 'Mombasa')
    ) {
      return 1000;
    }
    if (
      (this.routingForm.value.departure === 'Mombasa' &&
        this.routingForm.value.destination === 'Mariakani') ||
      (this.routingForm.value.departure === 'Mariakani' &&
        this.routingForm.value.destination === 'Mombasa')
    ) {
      return 250;
    }
    if (
      (this.routingForm.value.departure === 'Mombasa' &&
        this.routingForm.value.destination === 'Miasenyi') ||
      (this.routingForm.value.departure === 'Miasenyi' &&
        this.routingForm.value.destination === 'Mombasa')
    ) {
      return 310;
    }
    if (
      (this.routingForm.value.departure === 'Mombasa' &&
        this.routingForm.value.destination === 'Voi') ||
      (this.routingForm.value.departure === 'Voi' &&
        this.routingForm.value.destination === 'Mombasa')
    ) {
      return 410;
    }
    if (
      (this.routingForm.value.departure === 'Mombasa' &&
        this.routingForm.value.destination === 'Mtito Andei') ||
      (this.routingForm.value.departure === 'Mtito Andei' &&
        this.routingForm.value.destination === 'Mombasa')
    ) {
      return 500;
    }
    if (
      (this.routingForm.value.departure === 'Mombasa' &&
        this.routingForm.value.destination === 'Kibwezi') ||
      (this.routingForm.value.departure === 'Kibwezi' &&
        this.routingForm.value.destination === 'Mombasa')
    ) {
      return 620;
    }
    if (
      (this.routingForm.value.departure === 'Mombasa' &&
        this.routingForm.value.destination === 'Emali') ||
      (this.routingForm.value.departure === 'Emali' &&
        this.routingForm.value.destination === 'Mombasa')
    ) {
      return 730;
    }
    if (
      (this.routingForm.value.departure === 'Nairobi' &&
        this.routingForm.value.destination === 'Mariakani') ||
      (this.routingForm.value.departure === 'Mariakani' &&
        this.routingForm.value.destination === 'Nairobi')
    ) {
      return 730;
    }
    if (
      (this.routingForm.value.departure === 'Nairobi' &&
        this.routingForm.value.destination === 'Miasenyi') ||
      (this.routingForm.value.departure === 'Miasenyi' &&
        this.routingForm.value.destination === 'Nairobi')
    ) {
      return 620;
    }
    if (
      (this.routingForm.value.departure === 'Nairobi' &&
        this.routingForm.value.destination === 'Voi') ||
      (this.routingForm.value.departure === 'Voi' &&
        this.routingForm.value.destination === 'Nairobi')
    ) {
      return 500;
    }
    if (
      (this.routingForm.value.departure === 'Nairobi' &&
        this.routingForm.value.destination === 'Mtito Andei') ||
      (this.routingForm.value.departure === 'Mtito Andei' &&
        this.routingForm.value.destination === 'Nairobi')
    ) {
      return 410;
    }
    if (
      (this.routingForm.value.departure === 'Nairobi' &&
        this.routingForm.value.destination === 'Kibwezi') ||
      (this.routingForm.value.departure === 'Kibwezi' &&
        this.routingForm.value.destination === 'Nairobi')
    ) {
      return 310;
    }
    if (
      (this.routingForm.value.departure === 'Nairobi' &&
        this.routingForm.value.destination === 'Emali') ||
      (this.routingForm.value.departure === 'Emali' &&
        this.routingForm.value.destination === 'Nairobi')
    ) {
      return 250;
    }

    return this.fare;
  }
}
