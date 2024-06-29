import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory, IProductFull } from '../../../waiters/repository/waiter-model';
import { NgClass } from '@angular/common';
import { ProductDetailedViewComponent } from '../product-detailed-view/product-detailed-view.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone:true,
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss'],
  imports: [NgClass,MatButtonModule, MatBottomSheetModule]
})
export class UsersHomeComponent implements OnInit {

  private bottomSheet = inject(MatBottomSheet);

  restaurantId: string = '';

  userService = inject(UserService);
  route = inject(ActivatedRoute);

  categories : ICategory[] =[];
  products : IProductFull[]=[]
  filteredProduct : IProductFull[]=[]
  filteredCategoryId: number = 0;
  forYou =[1,2,2,3]



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const restaurantId = params.get('restaurantId');
      if(restaurantId){
        localStorage.setItem('restaurantId', restaurantId);
        this.restaurantId = restaurantId;
        this.fetchCategories(restaurantId); 
        this.fetchProducts(restaurantId); 
      }
    });  
  }

  fetchCategories(uid:string){
    this.userService.fetchCategories(uid).subscribe((res)=>{
      this.categories = res.data
      console.log(res.data,'categoriesssss');  
    });
  }
 
  fetchProducts(uid:string){
    this.userService.fetchProducts(uid).subscribe((res)=>{
      this.products = res.data
      this.filteredProduct = res.data
      console.log(res.data);  
    });
  }
 
  filterProduct(categoryId:number){
    if(categoryId === 0){
      this.filteredProduct = this.products
      this.filteredCategoryId = 0;
    }else{
      this.filteredCategoryId = categoryId
      this.filteredProduct = this.products.filter((item)=>{
        return item.category_id === categoryId
      })
    }  
  }

  openDetailedView(){
    this.bottomSheet.open(ProductDetailedViewComponent);
  }

}
