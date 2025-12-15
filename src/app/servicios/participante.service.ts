import { Participante } from './../interfaces/participante';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/participante';
  constructor() { }

  getParticipante(id: number): Observable<Participante>{
    return this.http.get<Participante>(`${this.url}/${id}`);
  }

  getParticipanteList(): Observable<Participante[]>{
    return this.http.get<Participante[]>(this.url);
  }

  getAmigoList(): Observable<Participante[]>{
    return this.http.get<Participante[]>(`${this.url}/amigos`);
  }
}
