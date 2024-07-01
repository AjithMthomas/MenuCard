import { Component, OnInit, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Product } from '../../../waiters/repository/waiter-model';

@Component({
  standalone:true,
  selector: 'app-product-detailed-view',
  templateUrl: './product-detailed-view.component.html',
  styleUrls: ['./product-detailed-view.component.scss']
})
export class ProductDetailedViewComponent implements OnInit {
  
  constructor() { }

  product:Product = inject(MAT_BOTTOM_SHEET_DATA);

  ngOnInit() {
  }

}
