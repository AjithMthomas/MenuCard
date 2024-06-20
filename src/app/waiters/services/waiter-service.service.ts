import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaiterServiceService {

  private http = inject(HttpClient)

  private apiUrl = 'http://ec2-3-110-201-100.ap-south-1.compute.amazonaws.com/api/v1'; // Replace with your API endpoint

  authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleGFtcGxlMWQyMSIsImV4cCI6MTcxODg5OTg5MX0.UGUy0BxOUrAZJ6rD7hQb2BD-3OCBIOGZ05veElMmIoQ"// Method to get the bearer token


  fetchProducts(): Observable<any> {

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.authToken}`)
    .set('Cache-Control', 'no-cache')
    .set('Pragma', 'no-cache');

    return this.http.get<any>(`${this.apiUrl}/user/product`, { headers })
  }
  
  fetchProductWithId(id:number): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/user/product/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`)
    });  }

  updateProduct(id:number,formData:FormData): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    return this.http.patch<any>(`${this.apiUrl}/user/product/${id}`, 
    formData,
    { headers: headers });  
  }

  deleteProduct(id:number): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    return this.http.delete<any>(`${this.apiUrl}/user/product/${id}`, 
    { headers: headers });  
  }


  fetchCategories(): Observable<any> {    

    return this.http.get<any>(`${this.apiUrl}/user/category`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`)
    });
  }

  addCategory(categoryName:string): Observable<any>{

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    const formData = new FormData();
    formData.append('name', categoryName);

    return this.http.post<any>(`${this.apiUrl}/user/category`, 
    formData,
    { headers: headers });
  }

  addProduct(formData:FormData): Observable<any>{

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    return this.http.post<any>(`${this.apiUrl}/user/product`, 
    formData,
    { headers: headers });
  }

}
