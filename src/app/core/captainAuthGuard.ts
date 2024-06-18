import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';


export const CaptainAuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {

  const router = inject(Router);

  const appToken = localStorage.getItem('captainToken');

  // To prevent going back to login page once loggedIn in captain and master
  let role = next.data['role'] as string;
  if (role === 'checkIsLoggedIn') {
    if (!appToken) {
      return true;
    } else {
      return false;
    }
  }

  // To prevent accessing the module if not loggedIn
  if (!appToken) {
    router.navigate(['/captain/login']);
    return false;
  }
  return true;
};
