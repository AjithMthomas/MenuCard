import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { WaiterServiceService } from '../../services/waiter-service.service';

@Component({
  standalone:true,
  selector: 'app-waiters-home',
  templateUrl: './waiters-home.component.html',
  styleUrls: ['./waiters-home.component.css'],
  imports : [MatSidenavModule,ProductModalComponent]
})
export class WaitersHomeComponent implements OnInit {
  products: { name: string, price: number }[] = []; // Array to hold products

  private router = inject(Router);
  private waiterService = inject(WaiterServiceService);
  ngOnInit() {
    // Fetch products when component initializes
    this.fetchProducts();
  }

  fetchProducts() {
    this.waiterService.fetchProducts().subscribe((res)=>{
      console.log(res);
      
    })


    this.products = [
      { name: 'Apple Juice', price: 100 },
      { name: 'Orange Juice', price: 90 },
      { name: 'Banana Smoothie', price: 120 },
      { name: 'Grape Juice', price: 110 },
      { name: 'Pineapple Juice', price: 95 },
      { name: 'Strawberry Smoothie', price: 130 },
      { name: 'Mango Lassi', price: 80 },
      { name: 'Watermelon Juice', price: 85 },
      { name: 'Peach Smoothie', price: 115 },
      { name: 'Blueberry Juice', price: 105 },
      { name: 'Lemonade', price: 75 },
      { name: 'Kiwi Smoothie', price: 120 },
      { name: 'Mixed Berry Smoothie', price: 125 }
        ];
  }

  addProduct(){
    console.log("Product added successfully!");

    this.router.navigate(['/captain/add']);

  }

}
