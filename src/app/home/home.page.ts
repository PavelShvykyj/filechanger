import {
  Component,
  computed,
  effect,
  inject,
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
  IonCardTitle,
  IonCheckbox,
  IonAlert,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FireAuthService } from '../fire.auth.service';
import { FireStorageService, IListData } from '../fire.storage.service';
import { FullMetadata, ListResult, StorageReference } from 'firebase/storage';
import {
  cloudDownloadOutline,
  folderOutline,
  folderOpenOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';



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
    IonCheckbox,
    IonAlert,
    CommonModule,
    RouterModule,
  ],
})
export class HomePage implements OnInit {
  auth = inject(FireAuthService);
  storage = inject(FireStorageService);
  selectedFilial = signal<StorageReference | null | undefined>(null);
  selectedFile: FullMetadata | null | undefined = null;
  parentFolder = signal<StorageReference | null | undefined>(null);
  router = inject(Router);
  public filials = computed(() => {
    return this.storage.rootFolders().map((item) => {
      return { ref: item, name: item.name };
    });
  });
  public filialFiles = signal<IListData | null>(null);
  public isModalOpen = false;
  public loadUrl = signal<string | null>(null);
  public confirmDeleButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.DeleteSelectedFiles();
      },
    },
  ];

  itemFilesSelected: StorageReference[] = [];

  constructor() {
    addIcons({ cloudDownloadOutline, folderOutline, folderOpenOutline });

    effect(
      () => {
        const filial = this.selectedFilial();
        this.parentFolder.set(filial);
      },
      { allowSignalWrites: true }
    );

    effect(
      ()=> {this.refresh()},
      { allowSignalWrites: true }
    );
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

  OnFileItemClick(itemFile: FullMetadata) {
    this.selectedFile = itemFile;
    this.loadUrl.set(null);
    this.storage.getDownloadUrl(itemFile.ref as StorageReference).then((url) => {
      this.loadUrl.set(url);
    });
  }

  OnParentFolderClick() {
    const currentParent = this.parentFolder();
    if (!!currentParent && currentParent.name !== this.selectedFilial()?.name) {
      this.parentFolder.set(this.parentFolder()?.parent);
    }
  }

  SignOut() {
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  OnItemCheck(isCheked: boolean, itemFile?: StorageReference ) {
    if (isCheked) {
      this.itemFilesSelected = this.itemFilesSelected.filter(
        (el) => el !== itemFile
      );
    } else {
      this.itemFilesSelected.push(itemFile as StorageReference);
    }
  }

  OnDownloadClick() {
    (this.selectedFile as FullMetadata).customMetadata = {'download': 'true'};
    this.storage.setMetadaByRef((this.selectedFile as FullMetadata).ref as StorageReference, {
      customMetadata: {'download': 'true'}
    });
  }

  isFileChecked(itemFile?: StorageReference) {
    return this.itemFilesSelected.includes(itemFile as StorageReference);
  }

  DeleteSelectedFiles() {
    if (this.itemFilesSelected.length === 0) {
      return;
    }

    this.storage.deleteFiles(this.itemFilesSelected).finally(() => {
      this.itemFilesSelected = [];
      this.refresh();
    });
  }

  refresh() {
    const folder = this.parentFolder();
    if (!!folder) {
      this.storage.getFromPath(folder.name).then((list) => {
        this.filialFiles.set(list);
      });
    }
  }
}
