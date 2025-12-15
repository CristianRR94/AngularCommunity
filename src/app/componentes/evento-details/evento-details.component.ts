import { Component, inject, OnInit } from '@angular/core';
import { EventoService } from '../../servicios/evento.service';
import { Evento } from '../../interfaces/evento';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evento-details',
  imports: [],
  templateUrl: './evento-details.component.html',
  styleUrl: './evento-details.component.scss'
})
export class EventoDetailsComponent implements OnInit{

  private eventoService = inject(EventoService);
  protected evento: Evento;
  private route = inject(ActivatedRoute);
  protected id: number = Number(this.route.snapshot.paramMap.get('id'));
   ngOnInit(): void {
    this.eventoService.getEvento(this.id).subscribe(data => {
      return this.evento = data;
    })
  }

}
