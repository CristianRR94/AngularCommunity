import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private route = inject(Router);
  private url: String = 'http://localhost:8080'
  private loggedIn: boolean = false;

  login(username: string, password: string){
    return this.http.post(`${this.url}/api/login`,
      {username, password},
      {withCredentials: true}
    ).pipe(tap(()=>this.loggedIn = true));
  }

  logout(){
    this.route.navigate(['/']);
    return this.http.post(`${this.url}/api/logout`,
      {},
      {withCredentials: true}
    ).pipe(tap(()=>this.loggedIn = false));
  }

  isLoggedIn(){
    return this.loggedIn;
  }

checkSession(): Observable<boolean> {
  return this.http.get("http://localhost:8080/api/me", { 
    withCredentials: true 
  }).pipe(
    map(() => true),
    catchError(() => of(false))
  );
}


}
