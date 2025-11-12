
import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/usuarios-componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { DetallesEventoComponent } from './componentes/detalles-evento/detalles-evento.component';
import { ErrorComponent } from './componentes/error/error.component';
import { SigninComponent } from './componentes/usuarios-componentes/signin/signin.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { EventoComponent } from './componentes/evento/evento.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'signin', component: SigninComponent },
  {path: '', component: PrincipalComponent },
  {path: 'evento/:id', component: EventoComponent },
  {path: 'evento/detalles/:id', component: DetallesEventoComponent },
  {path: 'crear-evento', component: CrearEventoComponent},

  {path: '**', component: ErrorComponent}
];
