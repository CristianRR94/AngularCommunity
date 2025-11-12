import { Directive, inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({providedIn: 'root'})
export class RepeatedEmailValidator implements AsyncValidator{
  private readonly usuarioService = inject(UsuarioService);
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.usuarioService.comprobarEmailExistente(control.value).pipe(map((existe)=>{
      return existe ? {emailExiste: true} : null;
    }), catchError(()=>of(null)));
  }


}

@Directive({
  selector: '[appEmailExists]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailExistsDirective),
      multi: true,
    },
  ],
})
export class EmailExistsDirective implements AsyncValidator{

  private readonly validator = inject(RepeatedEmailValidator);
  constructor() { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
  registerOnValidatorChange?(fn: () => void): void {

  }

}
function forwardRef(arg0: () => any): any {

}

