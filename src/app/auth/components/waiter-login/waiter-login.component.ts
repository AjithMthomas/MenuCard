import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-waiter-login',
  templateUrl: './waiter-login.component.html',
  styleUrls: ['./waiter-login.component.scss']
})
export class WaiterLoginComponent implements OnInit {

  constructor() { }
  private router = inject(Router)

  ngOnInit() {
  }

  navigateToHome(){
    this.router.navigate(['captain/index'])
  }

}
