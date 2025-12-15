import { inject } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

/* export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
     return true;
  }
 else {
  router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  return false;
 }
}; */

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkSession().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );
};

