import { Component, inject, OnDestroy } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonLabel,
    IonItem,
    IonButtons,
    IonButton,
    CommonModule,
    RouterModule
  ],
})
export class HomePage   {
  // dataSource = inject(FireService);
  // fakeData: Array<any> = []
  // subs: Subscription | undefined = undefined;

  // constructor() {}
  // ngOnDestroy(): void {
  //   console.log('destroed');
  // }

  // ionViewDidEnter() {
  //   console.log('enter');
  //   this.subs = this.dataSource.fakedata$.subscribe(res => {this.fakeData = [...res]})
  // }

  // ionViewDidLeave() {
  //   console.log('leave',this.subs);
  //   this.subs?.unsubscribe();
  // }
}
