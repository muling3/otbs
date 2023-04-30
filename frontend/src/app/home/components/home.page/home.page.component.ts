import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {

  username: string = ''
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("otbs-user") as string
    if(!this.username) this.route.navigate(['/auth'])
  }

}
