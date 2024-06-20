import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
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
  products=signal<{name: string, price: number, image:string,id: number }[]>([]); // Array to hold products

  selectedProductId : number | undefined;
  addNewProduct : boolean = false;
  @ViewChild('editdrawer') editdrawer!: MatDrawer;
  @ViewChild('drawer') drawer!: MatDrawer;


  private router = inject(Router);
  private waiterService = inject(WaiterServiceService);
  ngOnInit() {
    // Fetch products when component initializes
    this.fetchProducts();
  }

  fetchProducts() {
    this.waiterService.fetchProducts().subscribe((res)=>{
      console.log(res);
      this.products.set(res.data)
      console.log(this.products(),'products');
      console.log(res.data,'datass');
      
    })

  }

  add(type?:string){
    if(type !== 'close'){
      this.addNewProduct = true
      setTimeout(()=>{
        this.drawer.toggle();
      },100)
    }else{
      this.addNewProduct = !this.addNewProduct
      this.drawer.toggle();
      this.fetchProducts();

    }

  }

  edit(id?:number) {
    if(id){
      this.selectedProductId = id
      setTimeout(()=>{
        this.editdrawer.toggle();
      },100)
    }else{
      this.editdrawer.toggle();
      this.selectedProductId = undefined
      this.fetchProducts();

    }
  }

  deleteProduct(productId:number){
    this.waiterService.deleteProduct(productId).subscribe((res) => {
      console.log(res);
      
    })
  }


}
