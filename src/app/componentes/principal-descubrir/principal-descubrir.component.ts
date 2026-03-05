import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuPrincipalComponent } from '../menu-principal/menu-principal.component';
import { EventoComponent } from '../evento/evento.component';
import { EventoService } from '../../servicios/evento.service';
import { isPlatformBrowser } from '@angular/common';
import { Evento } from '../../interfaces/evento';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal-descubrir',
  imports: [MenuPrincipalComponent, EventoComponent, RouterLink],
  templateUrl: './principal-descubrir.component.html',
  styleUrl: './principal-descubrir.component.scss'
})
export class PrincipalDescubrirComponent implements OnInit{
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
