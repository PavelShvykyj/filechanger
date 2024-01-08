import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
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
  IonCardTitle
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FireAuthService } from '../fire.auth.service';
import { FireStorageService } from '../fire.storage.service';
import { ListResult, StorageReference } from 'firebase/storage';
import { cloudDownloadOutline, folderOutline, folderOpenOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'



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
    IonListHeader,
    IonLabel,
    IonItem,
    IonButtons,
    IonButton,
    IonSplitPane,
    IonMenu,
    IonAvatar,
    IonNote,
    IonText,
    IonIcon,
    IonFooter,
    IonModal,
    IonSpinner,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    CommonModule,
    RouterModule,
  ],
})
export class HomePage implements OnInit {
  auth = inject(FireAuthService);
  storage = inject(FireStorageService);
  selectedFilial = signal<StorageReference | null | undefined>(null);
  parentFolder = signal<StorageReference | null | undefined>(null);

  public filials = computed(() => {
    return this.storage.rootFolders().map((item) => {
      return { ref: item, name: item.name };
    });
  });
  public filialFiles = signal<ListResult | null>(null);
  public isModalOpen = false;
  public loadUrl = signal<string | null>(null);

  constructor() {
    addIcons({ cloudDownloadOutline, folderOutline, folderOpenOutline});


    effect(() => {
      const filial = this.selectedFilial();
      this.parentFolder.set(filial);
    }, {allowSignalWrites: true});

    effect(() => {

      const folder = this.parentFolder();
      if (!!folder) {
        this.storage.getFromPath(folder.name).then(list => {
          console.log('getFromPath', list);

          this.filialFiles.set(list);
        });
      }
    }, {allowSignalWrites: true});
  }

  ngOnInit(): void {
    this.storage.getRoot();
  }

  GetRoot() {
    this.storage.getRoot();
  }

  OnFilialClick(filial: StorageReference) {
    this.selectedFilial.set(filial);
  }

  OnFolderItemClick(itemFolder: StorageReference) {
    this.parentFolder.set(itemFolder);
  }

  OnFileItemClick(itemFile: StorageReference) {
    this.loadUrl.set(null);
    this.storage.getDownloadUrl(itemFile).then(url => {
      this.loadUrl.set(url);
    })
  }

  OnParentFolderClick() {
    const currentParent = this.parentFolder();
    if (!!currentParent && currentParent.name !== this.selectedFilial()?.name) {
      this.parentFolder.set(this.parentFolder()?.parent)
    }
  }
}
