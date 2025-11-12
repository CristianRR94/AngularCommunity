import { AuthService } from './../servicios/auth.service';
import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { error } from 'console';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  if(isPlatformServer(platformId)){
    return next(req);
  }
  const token = localStorage.getItem('token');
  let headers = req.headers;

  if(!(req.body instanceof FormData)){
    headers = headers.set('Content-type', 'application/json');
  }
  if(token){
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  const authReq = req.clone({headers});

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401 || error.status === 403){
        return authService.refreshToken().pipe(
          switchMap(newToken => {
            localStorage.setItem('token', newToken);
            const updateHeaders = req.headers.set('Authorization', `Bearer${newToken}`);
            const newRequest = req.clone({headers: updateHeaders});
            return next(newRequest);
          })
        )
      }

      return throwError(()=> error);
    })
  );
};
