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

  placeholderId: string = '';
  placeholderFare!: number;

  @ViewChild('accomodationForm') accomodationForm!: NgForm;

  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;

  ngOnInit(): void {
    this.placeholderId = localStorage.getItem('id') as string;

    //get existing placeholder
    this.bookingService.getPlaceholder(this.placeholderId).subscribe((data) => {
      if (data) {
        this.placeholderFare = data.fare!;
      }
    });
  }

  accomodationSubmit(): void {
    if (this.accomodationForm.valid) {
      //set number of passengers to localstorage
      localStorage.setItem('np', this.accomodationForm.value['no-pass']);

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
