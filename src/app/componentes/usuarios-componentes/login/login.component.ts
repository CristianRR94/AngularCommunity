import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { passwordRepeatValidator } from '../../../directivas/password.directive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  protected route = inject(Router);

  //protected formulario: FormGroup;
  ngOnInit(): void {

  }
      protected autenticarse = new FormGroup({
        nombre: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required, Validators.minLength(8)]),

      });


registrar(){
  this.route.navigate(['signin']);
}





}
