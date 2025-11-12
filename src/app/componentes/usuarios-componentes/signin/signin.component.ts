import { RepeatedNameValidator } from './../../../directivas/repeated-name.directive';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordRepeatValidator } from '../../../directivas/password.directive';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Router } from '@angular/router';
import { RepeatedEmailValidator } from '../../../directivas/email-exists.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit, OnDestroy{


  protected usuarioService: UsuarioService = inject(UsuarioService);
  protected fb = inject(FormBuilder);
  protected usuario: Usuario = this.usuarioService.usuario;
  protected router: Router = inject(Router);
  protected formulario: FormGroup;
  protected repContra = signal<boolean>(false);
  protected repeatedNameValidator = inject(RepeatedNameValidator);
  protected repeatedEmailValidator = inject(RepeatedEmailValidator);
  private subscripcion?: Subscription;

  ngOnInit(): void {
       this.usuario = {
      nombre: '',
      password: '',
      email: ''
    }
    this.formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)],[this.repeatedNameValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repetirPassword: [''],
    email: ['', [Validators.required, Validators.email], [this.repeatedEmailValidator]]
   },{validators: passwordRepeatValidator, updateOn: 'blur'});
  }

  crear(){
    console.log("enviando datos");
    if(this.formulario.valid){
      this.subscripcion = this.usuarioService.postUsuario(this.formulario.value).subscribe(data =>{
          console.log("enviando estos datos: " +data);
      return data = this.usuario;
    }), this.router.navigate(['login']);
  }
    else if(this.formulario.invalid){
      console.log('Error en los datos');
      this.formulario.markAllAsTouched();
    }
    else console.log("Algo ha ido MUY mal para acabar aquí");
  }

  ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  }

  bluring(){
    this.repContra.set(true);
  }

   noBluring(){
    this.repContra.set(false);
  }


}
