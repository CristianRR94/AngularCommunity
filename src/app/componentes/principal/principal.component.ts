import { Component, inject, OnInit, Output, signal } from '@angular/core';
import { EventoService } from '../../servicios/evento.service';
import { map, Observable, reduce } from 'rxjs';
import { EventoComponent } from "../evento/evento.component";
import { Evento } from '../../interfaces/evento';
import { RouterLink } from "@angular/router";
import e from 'express';


@Component({
  selector: 'app-principal',
  imports: [EventoComponent, RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit{

  private eventoService = inject(EventoService);

/*   protected eventos$ = this.eventoService.getEventos();
  protected idEvento$: Observable<number[]> = this.eventos$.pipe(map(e => e.map(eventos => eventos.id!))); */
  protected eventos: Evento[] = [];

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe((data)=>{
      this.eventos = data;
    })
  }

}
