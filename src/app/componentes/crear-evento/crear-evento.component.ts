import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EventoService } from '../../servicios/evento.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evento } from '../../interfaces/evento';


@Component({
  selector: 'app-crear-evento',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.scss'
})
export class CrearEventoComponent implements OnInit, OnDestroy {

  private eventoService = inject(EventoService);
  private evento: Evento;
  private fb = inject(FormBuilder);
  protected form: FormGroup;
  private subscripcion: Subscription;
  formData = new FormData;
  imagenArchivo : File | null = null;


    ngOnInit(): void {
      this.evento = {
        nombreEvento: '',
        maxNumParticipantes: 20
      }

    this.form = this.fb.group({
      nombreEvento: ['', Validators.required ],
      tipoEvento: [''],
      fechaEvento: [],
      informacion: '',
      privado: true,
      oculto: true,
      maxNumParticipantes: [20, [Validators.min(1), Validators.max(255)]]
    })
  }
crear(){
  console.log(this.form.value);
  if(!this.form.valid){
     this.form.markAllAsTouched();
     return;
  }
  else if(this.form.valid){
    console.log("1. Formulario válido, preparando FormData...");
    const formData = new FormData();
    const eventoJson = JSON.stringify(this.form.value);
    formData.append('evento', new Blob([eventoJson], {type: 'application/json'}));
      if(this.imagenArchivo){
      formData.append('image', this.imagenArchivo);
    }
    console.log("2. Llamando al servicio...");
this.subscripcion = this.eventoService.postEvento(formData).subscribe({
    next: data => console.log("3. ¡Éxito!", data),
    error: err => console.error("3. ¡ERROR en la petición!", err)
});



   /*  this.subscripcion = this.eventoService.postEvento(formData).subscribe(data => {
      return this.evento = data;
    }) */
  }
}

 ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  }


  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length > 0){
      this.imagenArchivo = input.files[0];
    }
  }
}
