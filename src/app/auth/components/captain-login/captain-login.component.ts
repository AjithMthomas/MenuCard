import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ILoginBody } from '../../repository/auth-model';
import { AlertBoxComponent } from '../../../shared/components/alert-box/alert-box/alert-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone:true,
  selector: 'app-captain-login',
  templateUrl: './captain-login.component.html',
  styleUrls: ['./captain-login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
  ]
})
export class CaptainLoginComponent implements OnInit {

  private router = inject(Router);
  loginForm?: any;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  passwordVisible = false;



  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.controls['password'].valueChanges.subscribe((value:any) => {
      this.passwordVisible =!value;
    });
  }

  navigateToHome(){
    this.router.navigate(['captain/index'])
  }

  onSubmit(): void {
    if (this.loginForm.valid) {  
       const body:ILoginBody = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
       }

       this.authService.captainLogin(body)

    }
}
contactAdmin(){
  const dialogRef = this.dialog.open(AlertBoxComponent, {
    width: '350px',
    data: {
      title: 'Connect with us',
      message: 'agilestacktech@gmail.com, +91 9539782052',
      confirmText: 'Ok',
      type:'info'
    }
  });

  
}

toggleVisibility() {
  this.passwordVisible =!this.passwordVisible;
  const passwordInput = document.getElementById('password') as HTMLInputElement | null;
  if (passwordInput) {
    if (this.passwordVisible) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}
}
