import { Observable, Subscription } from 'rxjs';
import { Participante } from '../../../interfaces/participante';
import { ParticipanteService } from '../../../servicios/participante.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-participantes',
  imports: [],
  templateUrl: './add-participantes.component.html',
  styleUrl: './add-participantes.component.scss'
})
export class AddParticipantesComponent implements OnInit, OnDestroy{


  private participanteService: ParticipanteService = inject(ParticipanteService);
  protected participantes: Observable<Participante[]> = this.participanteService.getAmigoList();
   private subscripcion?: Subscription;
   protected amigos?: Participante[];
    ngOnInit(): void {
      this.participantes.subscribe(p=>{
        return p.map(p=>p.amigos = this.amigos);
      })
  }

   ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  }

}

