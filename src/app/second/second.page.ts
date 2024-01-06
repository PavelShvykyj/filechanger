import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { addIcons } from 'ionicons';
import {caretBack} from 'ionicons/icons';
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
  IonBackButton
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
  standalone: true,
  imports: [ CommonModule,
    IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonBackButton

  ]
})
export class SecondPage {

  constructor() {
     addIcons({caretBack}) ;
   }

}
