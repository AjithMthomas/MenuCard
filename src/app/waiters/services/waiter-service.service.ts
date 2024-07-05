import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaiterRepository } from '../repository/waiter-repository';

@Injectable({
  providedIn: 'root'
})
export class WaiterServiceService {

  private waiterRepository = inject(WaiterRepository)

  fetchCaptainDetails(){
    return this.waiterRepository.fetchCaptainDetails();
  }
  setAdvertisement(formData:FormData){
    return this.waiterRepository.setAdvertisement(formData);
  }
  updateAdvertisement(id:number,formData:FormData){
    return this.waiterRepository.updateAdvertisement(id,formData);
  }
  getAdvertisement(){
    return this.waiterRepository.getAdvertisement();
  }

  fetchProducts(): Observable<any> {
    return this.waiterRepository.fetchProducts()
  }

  editPortion(id:number,formData:any): Observable<any> {
    return this.waiterRepository.editPortion(id,formData);
  }
  
  deletePortion(id:number): Observable<any> {
    return this.waiterRepository.deletePortion(id);
  }
  
  fetchProductWithId(id:number): Observable<any> {
    return this.waiterRepository.fetchProductWithId(id)
  }

  fetchCategoryWithId(id:number): Observable<any> {
    return this.waiterRepository.fetchCategoryWithId(id)
  }

  updateProduct(id:number,formData:FormData): Observable<any> {
    return this.waiterRepository.updateProduct(id,formData) 
  }

  updateCategory(id:number,formData:FormData): Observable<any> {
    return this.waiterRepository.updateCategory(id,formData) 
  }

  deleteProduct(id:number): Observable<any> {
    return this.waiterRepository.deleteProduct(id) 
  }

  deleteCategory(id:number): Observable<any> {
    return this.waiterRepository.deleteCategory(id) 
  }

  fetchCategories(): Observable<any> {    
    return this.waiterRepository.fetchCategories()
  }

  addCategory(categoryName:string): Observable<any>{
    const formData = new FormData();
    formData.append('name', categoryName);
    return this.waiterRepository.addCategory(formData)
  }

  addCategoryFromModal(formData:FormData): Observable<any>{
    return this.waiterRepository.addCategory(formData)
  }

  addProduct(formData:FormData): Observable<any>{
    return this.waiterRepository.addProduct(formData)
  }

}
