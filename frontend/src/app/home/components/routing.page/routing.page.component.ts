import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.page.component.html',
  styleUrls: ['./routing.page.component.scss']
})
export class RoutingPageComponent implements OnInit {

  //stations
  stations: string[] = [
    'Nairobi',
    'Emali',
    'Kibwezi',
    'Mtito Andei',
    'Voi',
    'Miasenyi',
    'Mariakani',
    'Mombasa',
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  routingSubmit(): void{

  }

}
