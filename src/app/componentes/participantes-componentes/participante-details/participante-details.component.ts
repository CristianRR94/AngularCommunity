
import { Participante } from '../../../interfaces/participante';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-participante-details',
  imports: [],
  templateUrl: './participante-details.component.html',
  styleUrl: './participante-details.component.scss'
})
export class ParticipanteDetailsComponent {

 @Input() participante!: Participante;

}
