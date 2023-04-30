import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  switchToUser(): void {
    localStorage.removeItem('admin');

    this.route.navigate(['/auth']);
  }

  logout(): void {
    localStorage.removeItem('admin');

    this.route.navigate(['/admin']);
  }
}
