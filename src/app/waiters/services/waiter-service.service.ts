import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaiterServiceService {

  private http = inject(HttpClient)

  private apiUrl = 'http://ec2-3-110-201-100.ap-south-1.compute.amazonaws.com/api/v1'; // Replace with your API endpoint



  fetchProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/products`);
  }

  fetchCategories(): Observable<any> {
    console.log('here');
    
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleGFtcGxlMWQyMSIsImV4cCI6MTcxODgwMjczM30.L9jTsN3WUbpZks5j1QiSL3wVb3nVLBxoPXScsaQyNL8"// Method to get the bearer token

    return this.http.get<any>(`${this.apiUrl}/user/category`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${authToken}`)
    });
  }

  addCategory(categoryName:string): Observable<any>{
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleGFtcGxlMWQyMSIsImV4cCI6MTcxODgwMjczM30.L9jTsN3WUbpZks5j1QiSL3wVb3nVLBxoPXScsaQyNL8"// Method to get the bearer token

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    const formData = new FormData();
    formData.append('name', categoryName);

    return this.http.post<any>(`${this.apiUrl}/user/category`, 
    formData,
    { headers: headers });
  }

}
