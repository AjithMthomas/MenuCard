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

  uid: string = '';

  userService = inject(UserService);
  route = inject(ActivatedRoute);

  categories : ICategory[] =[];
  products : IProductFull[]=[]
  filteredProduct : IProductFull[]=[]
  filteredCategoryId: number = 0;
  forYou =[1,2,2,3]



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const uid = params.get('uid');
      this.fetchCategories('1b265dbd-92b9-45fb-b3b8-4c98c9ecd10a'); // Call fetchCategories after getting uid
      this.fetchProducts('1b265dbd-92b9-45fb-b3b8-4c98c9ecd10a'); // Call fetchCategories after getting uid
      if(uid){
        this.uid = uid;
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
