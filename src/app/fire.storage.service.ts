import { Injectable, inject, signal } from '@angular/core';
import { FireService } from './fire.service';
import { StorageReference, getDownloadURL, getStorage, list, listAll, ref } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  fireservice = inject(FireService);
  private storage = getStorage(this.fireservice.app,environment.firebase.storageBucket);
  private notificator = inject(NotificationService);
  public rootFolders = signal<StorageReference[]>([])


  constructor() { }

  getRoot() {
    const pathref = ref(this.storage);
    listAll(pathref).then(res => {
      this.rootFolders.set(res.prefixes);

      //return res.prefixes.map(item => {return {ref: item, name: item.name, selected: false }})
    }).catch((error)=>{
      this.notificator.NotificateError(
        'Get root folders:  '.concat(JSON.stringify(error))
      );
    })
  }

   getFromPath(path: string) {
    const pathref = ref(this.storage,path);
    return list(pathref).then(res => {
       return res
    }).catch((error)=>{
      this.notificator.NotificateError(
        'Get items by path:  '.concat(JSON.stringify(error))
      );
      return null;
    })
  }

  getDownloadUrl(itemFile: StorageReference) {
    return getDownloadURL(itemFile).then(url=> {
      return url;

    }).catch((error)=>{
      this.notificator.NotificateError(
        'Get url by path:  '.concat(JSON.stringify(error))
      );
      return null;
    })

  }
}
