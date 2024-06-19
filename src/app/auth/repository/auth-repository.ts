import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginBody, ITokenResponse } from './auth-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoy {

     http = inject(HttpClient);

    captainLogin(body:ILoginBody): Observable<ITokenResponse> {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
      });
      return this.http.post<ITokenResponse>(`http://ec2-3-110-201-100.ap-south-1.compute.amazonaws.com/api/v1/login`,formData);
    }

}
