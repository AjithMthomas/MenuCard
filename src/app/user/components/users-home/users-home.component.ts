import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory, IProductFull, Product } from '../../../waiters/repository/waiter-model';
import { NgClass } from '@angular/common';
import { ProductDetailedViewComponent } from '../product-detailed-view/product-detailed-view.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../../shared/pipes/search-pipe/search.pipe";
import { initFlowbite } from 'flowbite';


@Component({
    standalone: true,
    selector: 'app-users-home',
    templateUrl: './users-home.component.html',
    styleUrls: ['./users-home.component.scss'],
    imports: [NgClass, MatButtonModule, MatBottomSheetModule, FormsModule, SearchPipe]
})
export class UsersHomeComponent implements OnInit {

  private bottomSheet = inject(MatBottomSheet);

  restaurantId: string = '';
  searchText: string = "";

  userService = inject(UserService);
  route = inject(ActivatedRoute);

  categories : ICategory[] =[];
  products : Product[]=[]
  filteredProduct : Product[]=[]
  filteredCategoryId: number = 0;
  forYou =[1,2,2,3]



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const restaurantId = params.get('restaurantId');
      if(restaurantId){
        localStorage.setItem('restaurantId', restaurantId);
        this.fetchAdvertisement(restaurantId); 
        this.restaurantId = restaurantId;
        this.fetchCategories(restaurantId); 
        this.fetchProducts(restaurantId); 
      }
    });  
  }

  fetchCategories(uid:string){
    this.userService.fetchCategories(uid).subscribe((res)=>{
      this.categories = res.data
      const specialCategoryIndex = this.categories.findIndex(category => category.name.toLowerCase() === 'specials');
    if (specialCategoryIndex !== -1) {
      const specialCategory = this.categories[specialCategoryIndex];
      this.categories.splice(specialCategoryIndex, 1); 
      this.categories.unshift(specialCategory); 
    }
      initFlowbite();
    });
  }

  fetchAdvertisement(uid:string){
    this.userService.getAdvertisement(uid).subscribe((res)=>{
      this.userService.adv.next(res.data)
    });
  }
 
  fetchProducts(uid:string){
    this.userService.fetchProducts(uid).subscribe((res)=>{
      this.products = res.data
      this.filteredProduct = res.data
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

  openDetailedView(item:IProductFull){

    this.bottomSheet.open(ProductDetailedViewComponent,{data:item});
  }

}
