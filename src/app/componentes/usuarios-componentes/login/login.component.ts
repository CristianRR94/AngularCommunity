import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { passwordRepeatValidator } from '../../../directivas/password.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../servicios/auth.service';
import { subscribe } from 'diagnostics_channel';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  protected route = inject(Router);
  private auth = inject(AuthService);
  private ruta = inject(ActivatedRoute);
  //protected formulario: FormGroup;
  ngOnInit(): void {

  }
      protected autenticarse = new FormGroup({
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required, Validators.minLength(8)]),

      });


registrar(){
  this.route.navigate(['signin']);
}

autenticar(){
  console.log('funciona login');
  this.auth.login(this.autenticarse.value.username!, this.autenticarse.value.password!).subscribe(data =>{
    this.route.navigate(['signin']);
    this.onLogginSuccess();
    return data;
  })
}

onLogginSuccess(){
  const returnUrl = this.ruta.snapshot.queryParams['returnUrl'] ||'/';
  this.route.navigate([returnUrl]);
}

}
