import { Component, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FireAuthService } from '../fire.auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage  {

  auth = inject(FireAuthService);
  router = inject(Router);
  credentionals = {
    email: "",
    password: ""
  }

  constructor() {
    effect(()=>{
      if(this.auth.LoggedStatus() === 'loggedin') {
        this.router.navigate(['home'])
      }
    })
   }

  onLoggin() {
    this.auth.loggIn(this.credentionals.email,this.credentionals.password);
  }

  OnForgotPassword(isValid: boolean | null) {
    if (!isValid) {
      return;
    }

    this.auth.passwordReset(this.credentionals.email);
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${inputLength} characters are typed`;
  }
}
