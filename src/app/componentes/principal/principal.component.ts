import { MenuPrincipalComponent } from './../../menu-principal/menu-principal.component';
import { Component, inject, OnInit, Output, PLATFORM_ID, signal } from '@angular/core';
import { EventoService } from '../../servicios/evento.service';
import { map, Observable, reduce } from 'rxjs';
import { EventoComponent } from "../evento/evento.component";
import { Evento } from '../../interfaces/evento';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-principal',
  imports: [EventoComponent, RouterLink, MenuPrincipalComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit{

  private eventoService = inject(EventoService);
  private platformId = inject(PLATFORM_ID);

/*   protected eventos$ = this.eventoService.getEventos();
  protected idEvento$: Observable<number[]> = this.eventos$.pipe(map(e => e.map(eventos => eventos.id!))); */
  protected eventos: Evento[] = [];

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
      this.eventoService.getEventos().subscribe({
        next: (data) => {
          console.log('Eventos cargados en navegador:', data);
          this.eventos = data;
        },
        error: (err) => {
          console.error('Error cargando eventos:', err);
        }
      });
    }


  }

}
