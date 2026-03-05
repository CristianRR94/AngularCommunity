import { AuthServiceJWT } from '../servicios/auth.serviceJWT';
import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthServiceJWT);

  if(isPlatformServer(platformId)){
    return next(req);
  }
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
// No interceptar el refresh
  if(req.url.includes('/refresh')){
    const refreshToken = localStorage.getItem('refresh_token');
    const refresReq = req.clone({
      setHeaders: {Authorization: `Bearer ${refreshToken}`}
    });
    return next(refresReq);
  }

  let clonedReq = req;

  let headers = req.headers;

  if(!(req.body instanceof FormData)){
   clonedReq = clonedReq.clone({ setHeaders: { 'Content-Type': 'application/json' } });
  }
  if(token){
    clonedReq = clonedReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
 // const authReq = req.clone({headers});
  console.log('Enviando petición a:', req.url);
  console.log('¿Lleva Token?:', !!token);
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401 ||error.status === 403){
        return authService.refreshToken().pipe(
          switchMap(response => {
            // response es el TokenResponse de Java (accessToken, refreshToken)
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            console.log(response.access_token, response.refresh_token);

            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.access_token}` }
            });
            return next(retryReq);
          }),
          catchError(()=>{
            authService.logOut();
            return throwError(()=> error);
          })
        )
      }

      return throwError(()=> error);
    })
  );
};

