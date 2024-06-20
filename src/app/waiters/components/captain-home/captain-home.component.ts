import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-captain-home',
  templateUrl: './captain-home.component.html',
  styleUrls: ['./captain-home.component.css']
})
export class CaptainHomeComponent implements OnInit {

  router = inject(Router)
  

  ngOnInit() {
  }
  
  navigateToProducts(){
    this.router.navigate(['/captain/products'])
  }
}
