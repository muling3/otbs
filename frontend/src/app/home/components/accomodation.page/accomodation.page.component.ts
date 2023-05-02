import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.page.component.html',
  styleUrls: ['./accomodation.page.component.scss'],
})
export class AccomodationPageComponent implements OnInit {
  constructor(private bookingService: BookingService, private route: Router) {}

  // total seats
  economyTotalSeats: number = 500;
  vipTotalSeats: number = 100;


  placeholderId: string = '';
  placeholderFare!: number;

  @ViewChild('accomodationForm') accomodationForm!: NgForm;

  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;
  username: String = '';
  economySlots!: number;
  vipSlots!: number;

  ngOnInit(): void {
    this.placeholderId = localStorage.getItem('otbs-id') as string;
    this.username = localStorage.getItem('otbs-user') as string;
    if (!this.username) this.route.navigate(['/auth']);
    if (!this.placeholderId) this.route.navigate(['/']);

    //get existing placeholder
    this.bookingService.getPlaceholder(this.placeholderId).subscribe((data) => {
      if (data) {
        this.placeholderFare = data.fare!;

        let economyQueryString = `travel_date=${data.travel_date!}&travel_time=${data.travel_time!}&departure=${data.departure!}&destination=${data.destination!}&accomodation=${'Economy'}`;
        let vipQueryString = `travel_date=${data.travel_date!}&travel_time=${data.travel_time!}&departure=${data.departure!}&destination=${data.destination!}&accomodation=${'Vip'}`;
       
        // getting remaining slots
        this.bookingService
          .getRemainingSlots(economyQueryString)
          .subscribe((d) => {
            if (d) {
              this.economySlots = d.slots as number;
            }
          });
        this.bookingService.getRemainingSlots(vipQueryString).subscribe((d) => {
          if (d) {
            this.vipSlots = d.slots as number;
          }
        });
      }
    });
  }

  accomodationSubmit(): void {
    if (this.accomodationForm.valid) {
      //set number of passengers to localstorage
      localStorage.setItem('otbs-np', this.accomodationForm.value['no-pass']);

      //update plaeholder
      this.bookingService
        .updatePlaceholder(this.accomodationForm.value, this.placeholderId)
        .subscribe((data) => {
          this.route.navigate(['/passenger']);
        });
    } else {
      this.showWarning = true;
      this.errorDisplay.nativeElement.innerHTML = `<small>All inputs are required</small>`;
      console.log(this.errorDisplay.nativeElement.textContent);
    }
  }
}
