import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaiterRepository {

  private http = inject(HttpClient)

  private baseUrl = environment.baseUrl

  fetchProducts(): Observable<any> {

    const headers = new HttpHeaders()
    .set('Cache-Control', 'no-cache')
    .set('Pragma', 'no-cache');

    return this.http.get<any>(`${this.baseUrl}/user/product`, { headers })
  }

  fetchProductWithId(id:number): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/user/product/${id}`);
  }

  updateProduct(id:number,formData:FormData): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/user/product/${id}`, 
    formData
    );  
  }

  deleteProduct(id:number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/product/${id}`
    );  
  }


  fetchCategories(): Observable<any> {    
    return this.http.get<any>(`${this.baseUrl}/user/category`);
  }

  addCategory(formData:FormData): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/user/category`, 
    formData
    );
  }

  addProduct(formData:FormData): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/user/product`, 
    formData
    );
  }


}
