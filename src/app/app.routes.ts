
import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/usuarios-componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';
import { SigninComponent } from './componentes/usuarios-componentes/signin/signin.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { EventoComponent } from './componentes/evento/evento.component';
import { EventoDetailsComponent } from './componentes/evento-details/evento-details.component';
import { AddParticipantesComponent } from './componentes/participantes-componentes/add-participantes/add-participantes.component';
import { authGuard } from './auth.guard';
import { PrincipalDescubrirComponent } from './componentes/principal-descubrir/principal-descubrir.component';
import { EditarEventoComponent } from './componentes/editar-evento/editar-evento.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'signin', component: SigninComponent },
  {path: '', component: PrincipalComponent, canActivate: [authGuard] },
 // {path: 'e/:id', component: EventoComponent },
  {path: 'evento/:id', component: EventoDetailsComponent, canActivate: [authGuard] },
  {path: 'crear-evento', component: CrearEventoComponent, canActivate: [authGuard]},
  {path: 'descubrir', component: PrincipalDescubrirComponent, canActivate: [authGuard]},
  {path: 'editar-evento', component: EditarEventoComponent, canActivate: [authGuard]},


  {path: 'amigos', component: AddParticipantesComponent, canActivate: [authGuard]},
  {path: '**', component: ErrorComponent}
];
