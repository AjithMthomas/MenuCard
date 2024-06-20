import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaiterRepository } from '../repository/waiter-repository';

@Injectable({
  providedIn: 'root'
})
export class WaiterServiceService {

  private waiterRepository = inject(WaiterRepository)



  fetchProducts(): Observable<any> {
    return this.waiterRepository.fetchProducts()
  }
  
  fetchProductWithId(id:number): Observable<any> {
    return this.waiterRepository.fetchProductWithId(id)
  }

  updateProduct(id:number,formData:FormData): Observable<any> {
    return this.waiterRepository.updateProduct(id,formData) 
  }

  deleteProduct(id:number): Observable<any> {
    return this.waiterRepository.deleteProduct(id) 
  }

  fetchCategories(): Observable<any> {    
    return this.waiterRepository.fetchCategories()
  }

  addCategory(categoryName:string): Observable<any>{
    const formData = new FormData();
    formData.append('name', categoryName);
    return this.waiterRepository.addCategory(formData)
  }

  addProduct(formData:FormData): Observable<any>{
    return this.waiterRepository.addProduct(formData)
  }

}
