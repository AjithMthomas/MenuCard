import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-captain-login',
  templateUrl: './captain-login.component.html',
  styleUrls: ['./captain-login.component.css']
})
export class CaptainLoginComponent implements OnInit {

  constructor() { }
  private router = inject(Router)

  ngOnInit() {
  }

  navigateToHome(){
    this.router.navigate(['captain/index'])
  }

}
