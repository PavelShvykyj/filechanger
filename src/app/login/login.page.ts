import { Component, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FireAuthService } from '../fire.auth.service';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonSplitPane,
  IonAvatar,
  IonNote,
  IonText,
  IonSpinner,
  IonMenu,
  IonIcon,
  IonListHeader,
  IonFooter,
  IonModal,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol,
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
     CommonModule,
     FormsModule,
     IonHeader,
     IonToolbar,
     IonTitle,
     IonContent,
     IonLabel,
     IonList,
     IonItem,
     IonButtons,
     IonButton,
     IonSplitPane,
     IonAvatar,
     IonNote,
     IonText,
     IonSpinner,
     IonMenu,
     IonIcon,
     IonListHeader,
     IonFooter,
     IonModal,
     IonCard,
     IonCardContent,
     IonCardHeader,
     IonCardTitle,
     IonCheckbox,
     IonAlert,
     IonGrid,
     IonRow,
     IonCol,
     IonInput
    ]
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
