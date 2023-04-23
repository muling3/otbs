import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  url: string = '';
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.url = this.route.url
  }

}
