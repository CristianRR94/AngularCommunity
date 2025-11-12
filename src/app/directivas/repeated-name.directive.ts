import { withFetch } from '@angular/common/http';
import { Directive, forwardRef, inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({providedIn: 'root'})
export class RepeatedNameValidator implements AsyncValidator {
  private readonly usuarioService = inject(UsuarioService);

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return this.usuarioService.comprobarNombreExistente(control.value).pipe(
        map((existe)=> (existe ? {nombreExiste: true} : null)
      ), catchError(()=> of(null)),
    );
  }
}
@Directive({
  selector: '[appRepeatedName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => RepeatedNameDirective),
      multi: true,
    },
  ],
})

export class RepeatedNameDirective implements AsyncValidator{

  private readonly validator = inject(RepeatedNameValidator);


  constructor() { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
  registerOnValidatorChange?(fn: () => void): void {

  }

}
