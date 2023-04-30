import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.component.html',
  styleUrls: ['./navbar.page.component.scss']
})
export class NavbarPageComponent implements OnInit {

  username: string = ''
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("otbs-user") as string
  }

  logout(): void {
    localStorage.removeItem("otbs-user");
    localStorage.removeItem("otbs-id");
    localStorage.removeItem("otbs-np")
    
    this.route.navigate(['/auth'])
  }
}
