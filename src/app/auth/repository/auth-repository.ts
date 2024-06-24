import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginBody, ITokenResponse } from './auth-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoy {

     http = inject(HttpClient);
     baseUrl = environment.baseUrl

    captainLogin(body:ILoginBody): Observable<ITokenResponse> {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
      });
      return this.http.post<ITokenResponse>(`${this.baseUrl}/login`,formData);
    }

}
