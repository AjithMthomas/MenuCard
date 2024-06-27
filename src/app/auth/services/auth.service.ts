import { Injectable, inject } from '@angular/core';
import { AuthRepositoy } from '../repository/auth-repository';
import { ILoginBody } from '../repository/auth-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from '../../shared/components/alert-box/alert-box/alert-box.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authRopository = inject(AuthRepositoy)
  private router = inject(Router)
  
  private dialog = inject(MatDialog);

  captainLogin(body:ILoginBody){

    this.authRopository.captainLogin(body).subscribe({
      next:(res)=>{ 
         if(res.access_token){
           localStorage.setItem('captainToken',res.access_token)
           this.router.navigate(['captain/index'])
      }
    },error:(error)=>{
      const dialogRef = this.dialog.open(AlertBoxComponent, {
        width: '350px',
        data: {
          title: 'Invalid Credentials',
          message: 'Invalid user name or password',
          confirmText: 'Ok',
          type:'critical'
        }
      });
    }
    })
   }
  }

