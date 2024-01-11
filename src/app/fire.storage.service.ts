import { Injectable, inject, signal } from '@angular/core';
import { FireService } from './fire.service';
import {
  StorageReference,
  getDownloadURL,
  getStorage,
  getMetadata,
  updateMetadata,
  list,
  listAll,
  ref,
  deleteObject,
  FullMetadata,
} from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

export interface IListData {
  prefixes: StorageReference[],
  items: FullMetadata[]
}

@Injectable({
  providedIn: 'root',
})
export class FireStorageService {
  fireservice = inject(FireService);
  private storage = getStorage(
    this.fireservice.app,
    environment.firebase.storageBucket
  );
  private notificator = inject(NotificationService);
  public rootFolders = signal<StorageReference[]>([]);

  constructor() {}

  getRoot() {
    const pathref = ref(this.storage);
    listAll(pathref)
      .then((res) => {
        this.rootFolders.set(res.prefixes);

        //return res.prefixes.map(item => {return {ref: item, name: item.name, selected: false }})
      })
      .catch((error) => {
        this.notificator.NotificateError(
          'Get root folders:  '.concat(JSON.stringify(error))
        );
      });
  }

  getFromPath(path: string): Promise<IListData | null> {
    const pathref = ref(this.storage, path);
    return list(pathref, {maxResults: 10})
      .then((res) => {
        const taskArray: Promise<FullMetadata>[] = [];
        res.items.forEach(ref=>{
          taskArray.push(getMetadata(ref));
        })

        return Promise.all(taskArray).then(metaArray=> {
          return {
            prefixes: res.prefixes,
            items: metaArray

          }


        })


      })
      .catch((error) => {
        this.notificator.NotificateError(
          'Get items by path:  '.concat(JSON.stringify(error))
        );
        return null;
      });
  }

  getDownloadUrl(itemFile: StorageReference) {
    return getDownloadURL(itemFile)
      .then((url) => {
        return url;
      })
      .catch((error) => {
        this.notificator.NotificateError(
          'Get url by path:  '.concat(JSON.stringify(error))
        );
        return null;
      });
  }

  getMetatadaByRef(ref: StorageReference) {
    return getMetadata(ref)
  }

  setMetadaByRef(ref: StorageReference, newMetaData:{customMetadata: { [key:string] : string}} ) {
    updateMetadata(ref,newMetaData);

  }

  deleteFiles(refs: StorageReference[]) {
    const tasks = refs.map((ref) => deleteObject(ref));
    return Promise.all(tasks)
      .then(() => {
        this.notificator.NotificateSuccess('Files are deleted');
        return true;
      })
      .catch((error) => {
        this.notificator.NotificateError(
          'Delete files:  '.concat(JSON.stringify(error))
        );
        return false;
      });
  }
}
