import { Evento } from './../../interfaces/evento';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-evento',
  imports: [],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})
export class EventoComponent {

   @Input() evento!: Evento;

  }



