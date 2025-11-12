import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  public usuario: Usuario;
  public usuarios: Usuario[];
  private url = 'http://localhost:8080/usuario'
  constructor() { }

  getUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>((`${this.url}/${id}`));
  }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  postUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url, usuario);
  }

  putUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>((`${this.url}/put/${usuario.id}`), usuario);
  }

  deleteUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url}/delete/${usuario.id}`);
  }

  comprobarNombreExistente(nombre: string): Observable<boolean>{
    return this.getUsuarios().pipe(map(usu => usu.some(u=>u.nombre === nombre)));
  }

   comprobarEmailExistente(email: string): Observable<boolean>{
    return this.getUsuarios().pipe(map(usu => usu.some(u=>u.email === email)));
  }
}
