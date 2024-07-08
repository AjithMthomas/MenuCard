import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRepository {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl

 submitLeads(formData:any): Observable<any> {
   
   return this.http.post<any>(`${this.baseUrl}/user/leads`,formData);
 }

}
