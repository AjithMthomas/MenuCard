import { Component, OnInit } from '@angular/core';
import { WaitersHomeComponent } from '../waiters-home/waiters-home.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-waiters-layout',
  templateUrl: './waiters-layout.component.html',
  styleUrls: ['./waiters-layout.component.css'],
  imports:[WaitersHomeComponent,RouterModule]
})
export class WaitersLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
