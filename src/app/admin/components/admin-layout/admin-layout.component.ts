import { Component, OnInit } from '@angular/core';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  imports:[AdminHomeComponent,RouterOutlet]
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
