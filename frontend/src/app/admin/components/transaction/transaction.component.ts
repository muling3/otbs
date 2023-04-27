import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from '../../services/booking.service';
import { BookingModel } from 'src/app/home/models/booking.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  approvedBookings!: BookingModel[]
  displayedColumns: string[] = ['departure', 'destination', 'accomodation', 'travel_date', 'travel_time', 'booked_by', 'contact', 'passengers', 'fare'];
  dataSource!: MatTableDataSource<BookingModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.confirmedBookings().subscribe(data => {
      this.approvedBookings = data

        // populating data source
      this.dataSource = new MatTableDataSource(this.approvedBookings);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}