import { Component, OnInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {

categories =["Snacks","popular","Breads","Drinks","Burgers","Pastries","Coffee"]

  ngOnInit() {
  }

}
