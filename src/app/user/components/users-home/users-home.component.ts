import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory, IProduct, IProductFull } from '../../../waiters/repository/waiter-model';
import { NgClass } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  imports: [NgClass],
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

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

}
