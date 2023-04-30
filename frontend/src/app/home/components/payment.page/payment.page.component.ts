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

  username: string = '';
  placeholderId: string = '';
  placeholderItem!: BookingModel;
  totalFare: number = 0;
  ngOnInit(): void {
    this.placeholderId = localStorage.getItem('otbs-id') as string;
    this.username = localStorage.getItem('otbs-user') as string;
    if (!this.username) this.route.navigate(['/auth']);
    if (!this.placeholderId) this.route.navigate(['/']);

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
        localStorage.removeItem('otbs-id');
        
        this.route.navigate(['/user']);
      });
  }

  cancelButton(): void {
    localStorage.removeItem('otbs-id');

    this.route.navigate(['/']);
  }
}
