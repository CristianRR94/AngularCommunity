import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { TokenResponse } from '../interfaces/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceJWT {
  protected baseURL = 'http://localhost:8080';
  protected http = inject(HttpClient);
  protected router = inject(Router);

  refreshToken(): Observable<TokenResponse> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    this.logOut();
    return throwError(() => new Error('No refresh token available'));
  }

  // 1. Tipamos el post directamente con TokenResponse
  // 2. Quitamos el envoltorio innecesario del tipo genérico
  return this.http.post<TokenResponse>(`${this.baseURL}/api/usuarios/refresh`, {}, {
    headers: { Authorization: `Bearer ${refreshToken}` }
  })
  .pipe(
    tap((response: TokenResponse) => {
      // 3. Guardamos cada uno en su clave correspondiente
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
    }),
    catchError(error => {
      this.logOut();
      return throwError(() => error);
    })
  );
}

  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  login(email: string, password: string): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.baseURL}/auth/login`, {email, password})
      .pipe(tap((response)=>{
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }));
  }

}

