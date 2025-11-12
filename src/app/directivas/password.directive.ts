
import {Directive, forwardRef, input} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const passwordRepeatValidator: ValidatorFn = (control: AbstractControl,): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repetirPassword');
    return password && repeatPassword && password.value !== repeatPassword.value ? {isNotValid: true} : null;
}

@Directive({
  selector: '[appPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordDirective),
      multi: true,
    },
  ],
})
export class PasswordDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
   return passwordRepeatValidator(control);
  }
  registerOnValidatorChange?(fn: () => void): void {

  }



}
