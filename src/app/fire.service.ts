import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FireService  {
  private _app = initializeApp(environment.firebase);
  get app() {
    return this._app
  }

  constructor() {
  }
}
