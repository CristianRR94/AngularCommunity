import { FormGroup } from "@angular/forms";

export interface FormUsuario {
  id: FormGroup<number>,
  nombre: FormGroup<string>,
  password: FormGroup<string>,
  repetirPassword: FormGroup<string>,
  email: FormGroup<string>
}
