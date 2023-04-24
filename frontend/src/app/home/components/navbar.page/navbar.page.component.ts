import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.component.html',
  styleUrls: ['./navbar.page.component.scss']
})
export class NavbarPageComponent implements OnInit {

  username: string = ''
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem("user") as string
  }

}
