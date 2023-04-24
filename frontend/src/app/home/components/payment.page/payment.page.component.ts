import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingModel } from '../../models/booking.model';

@Component({
  selector: 'app-payment.page',
  templateUrl: './payment.page.component.html',
  styleUrls: ['./payment.page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  placeholderId: string = ''
  placeholderItem!: BookingModel
  ngOnInit(): void {
    this.placeholderId = localStorage.getItem('id') as string;

    this.bookingService.getPlaceholder(this.placeholderId).subscribe(data => {
      if(data){
        this.placeholderItem = data
        console.log(this.placeholderItem)
      }
    })
  }

  summarySubmit(): void{}
}
