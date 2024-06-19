import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ILoginBody } from '../../repository/auth-model';

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
  private authService = inject(AuthService)


  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
}
