import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

  private router = inject(Router);

  goHome(): void {
    const restaurantId = localStorage.getItem('restaurantId');
    console.log('here');
    
    if (restaurantId) {
      this.router.navigate(['user', restaurantId]);
    } else {
      this.router.navigate(['/captain/captain-login']);
    }
  }
}
