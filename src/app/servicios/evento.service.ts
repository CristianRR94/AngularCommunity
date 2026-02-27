import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Evento } from '../interfaces/evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/eventos';
  private baseUrl = 'http://localhost:8080';
  private formData = new FormData();

  constructor() { }

  getEvento(id: number): Observable<Evento>{
    return this.http.get<Evento>(`${this.url}/${id}`);
  }

  getEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.url}/mis-eventos`);
  }

  postEvento(formData: FormData): Observable<Evento>{

    return this.http.post<Evento>(this.url, formData);
  }

  putEvento(evento: Evento): Observable<Evento>{
    return this.http.put<Evento>(this.url, evento);
  }

  deleteEvento(evento: Evento): void{
    this.http.delete<Evento>(`${this.url}/${evento.id}`);
  }

  postImagen(file: File){
    const formData = new FormData();
    formData.append('imagen', file);

    return this.http.post(this.baseUrl + '/imagen', formData, {responseType: 'text'});
  }
}
