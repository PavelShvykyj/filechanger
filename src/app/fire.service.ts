import { EnvironmentInjector, Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
//import { getDatabase, ref, onValue, DataSnapshot } from 'firebase/database';
import { getStorage, getDownloadURL, ref, list  , listAll, getMetadata } from 'firebase/storage'
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireService  {
  private _app = initializeApp(environment.firebase);
  get app() {
    return this._app

  }
  //private db = getDatabase(this.app);

  private storage = getStorage(this.app,environment.firebase.storageBucket);

  //public fakedata$: Observable<any>;



  constructor() {
    //this.fakedata$ = this.CreateSourse('reports');


  }

  CreateSourse(path: string) {
    const pathref = ref(this.storage);
    listAll(pathref).then(res => {list(ref(this.storage, res.prefixes[0].fullPath))})


  }



  // CreateSourse(path: string) {
  //   return new Observable((observer)=>{



  //     const pointRef = ref(this.db, path);
  //     const unsub = onValue(pointRef, (snapshot: DataSnapshot) => {
  //       console.log('value',snapshot.val())
  //       observer.next(snapshot.val());
  //     });
  //     console.log('unsub', unsub)
  //     return ()=> {
  //       console.log('unsubscribe call', unsub)
  //       unsub()
  //     }
  //   }).pipe(map(data => {return this.ObjToArray(data as any)}));
  //   // ! shareReplay() - если использовать, то по сути мы подписываемся на промкжуточный subject с мультикастом и отписка всего лиш уберет нас из его списка сподписчиков и наша функция отписки не вызоветься т.е. fb будет емитить значения
  // }

  ObjToArray(data: {[key: string]: any}): Array<any> {
    const res: any = [];
    const keys = Object.keys(data);
    keys.forEach(key => {res.push(data[key])})
    return res;
  }


}
