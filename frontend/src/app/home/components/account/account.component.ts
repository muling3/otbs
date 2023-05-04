import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingModel } from '../../models/booking.model';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(
    private bookingService: BookingService,
    private userService: UserService,
    private dialog: MatDialog,
    private route: Router,
    private modalService: NgbModal
  ) {}

  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;

  username: string = '';
  userObject!: UserModel;
  pendingBookings: BookingModel[] = [];
  approvedBookings: BookingModel[] = [];
  allBookings: BookingModel[] = [];

  ngOnInit(): void {
    this.username = localStorage.getItem('otbs-user') as string;
    if (!this.username) this.route.navigate(['/auth']);

    //get user object
    this.userService.getUserByUsername(this.username).subscribe((data) => {
      if (data) {
        this.userObject = data;
      }
    });

    // pending bookings
    this.bookingService
      .getUserPendingBookings(this.username)
      .subscribe((data) => {
        if (data) {
          this.pendingBookings = data;
        }
      });

    // already confirmed bookings
    this.bookingService
      .getUserConfirmedBookings(this.username)
      .subscribe((data) => {
        if (data) {
          this.approvedBookings = data;

          this.allBookings = [
            ...this.pendingBookings,
            ...this.approvedBookings,
          ];
        }
      });
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        from: this.allBookings[index].departure,
        to: this.allBookings[index].destination,
        travelDate: this.allBookings[index].travel_date,
        travelTime: this.allBookings[index].travel_time,
        accomodation: this.allBookings[index].accomodation,
        passengers: this.allBookings[index].passengers,
        fare: this.allBookings[index].fare,
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  updateAccountDialog(form: NgForm): void {
    // update the account in db
    this.userService
      .updateAccountDetails(form.value, this.userObject.email as String)
      .subscribe(
        (d) => {
          if (d) {
            console.log(d);
          }
        },
        (err) => {
          this.showWarning = true;
          this.errorDisplay.nativeElement.innerHTML = `<small>${
            err.error.message ? err.error.message : 'Server Not Found'
          }</small>`;
        }
      );
    this.modalService.dismissAll();
  }
  openAccountModal(content: any): void {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
}
