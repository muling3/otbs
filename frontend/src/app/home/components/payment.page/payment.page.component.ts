import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingModel } from '../../models/booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment.page',
  templateUrl: './payment.page.component.html',
  styleUrls: ['./payment.page.component.scss'],
})
export class PaymentPageComponent implements OnInit {
  constructor(private bookingService: BookingService, private route: Router) {}

  placeholderId: string = '';
  placeholderItem!: BookingModel;
  totalFare: number = 0;
  ngOnInit(): void {
    this.placeholderId = localStorage.getItem('id') as string;

    this.bookingService.getPlaceholder(this.placeholderId).subscribe((data) => {
      if (data) {
        this.placeholderItem = data;
        this.totalFare =
          this.placeholderItem.fare! * this.placeholderItem.passengers!.length;
      }
    });
  }

  confirmButton(): void {
    //updating user_confirmed
    this.bookingService
      .updatePlaceholder(
        {
          user_confirmed: true,
        },
        this.placeholderId
      )
      .subscribe((data) => {
        this.route.navigate(['/account']);
      });
  }

  cancelButton(): void {
    this.route.navigate(['/']);
  }
}
