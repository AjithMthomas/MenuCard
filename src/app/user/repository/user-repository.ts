import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  http = inject(HttpClient);

  baseUrl = environment.baseUrl

  fetchCategories(user_id:string): Observable<any>{
    const params = { user_id };
    return this.http.get<any>(`${this.baseUrl}/category`, { params })
  }

  fetchProducts(user_id:string): Observable<any>{
    const params = { user_id };
    return this.http.get<any>(`${this.baseUrl}/product`, { params })
  }
}
