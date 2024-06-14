import { Component, OnInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-waiters-home',
  templateUrl: './waiters-home.component.html',
  styleUrls: ['./waiters-home.component.css'],
  imports : []
})
export class WaitersHomeComponent implements OnInit {
  products: { name: string, price: number }[] = []; // Array to hold products

  constructor() { }

  ngOnInit() {
    // Fetch products when component initializes
    this.fetchProducts();
  }

  fetchProducts() {

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

}
