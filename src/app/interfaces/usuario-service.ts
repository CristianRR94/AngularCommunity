import { Observable } from "rxjs";

export interface UsuarioService {
  comprobarNombreExistente: (nombre: string) => Observable<boolean>
}
