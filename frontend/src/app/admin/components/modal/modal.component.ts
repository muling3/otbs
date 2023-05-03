import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog.data.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {}

  confirmBooking(id: String): void {
    this.bookingService.confirmBooking(id).subscribe((data) => {
      console.log('confirm', data);

      //ending the booking process
      this.bookingService.endBooking(data.updated).subscribe((res) => {
        console.log('end', res);
      });
    });
  }

  rejectBooking(): void {}
}
