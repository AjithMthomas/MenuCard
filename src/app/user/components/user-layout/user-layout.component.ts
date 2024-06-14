import { Component, OnInit } from '@angular/core';
import { UsersHomeComponent } from '../users-home/users-home.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
  imports:[UsersHomeComponent,RouterModule]
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
