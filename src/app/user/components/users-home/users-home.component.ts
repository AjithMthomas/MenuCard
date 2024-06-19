import { Component, OnInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

categories =["Snacks","popular","Breads","Drinks","Burgers","Pastries","Coffee"]
  
  forYou =[1,2,2,3]
  ngOnInit() {
  }

}
