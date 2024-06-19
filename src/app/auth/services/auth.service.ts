import { Injectable, inject } from '@angular/core';
import { AuthRepositoy } from '../repository/auth-repository';
import { ILoginBody } from '../repository/auth-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authRopository = inject(AuthRepositoy)
  private router = inject(Router)

  captainLogin(body:ILoginBody){
   this.authRopository.captainLogin(body).subscribe((res) =>{
    if(res.access_token){
      localStorage.setItem('captainToken',res.access_token)
      this.router.navigate(['captain/index'])
    }
   })
  }
}
