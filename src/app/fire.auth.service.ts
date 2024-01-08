import { FireService } from './fire.service';
import {
  Injectable,
  WritableSignal,
  Signal,
  inject,
  signal,
  computed,
} from '@angular/core';
import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class FireAuthService {
  private fireapp = inject(FireService).app;
  private notificator = inject(NotificationService);
  private auth = getAuth(this.fireapp);
  private credentional: WritableSignal<UserCredential | null> = signal(null);
  public isLoggedin = computed(() => !!this.credentional());
  public LoggedStatus: Signal<'pending' | 'loggedin' | 'loggedout'> = computed(
    () => {
      if (this.isPending()) {
        return 'pending';
      }
      if (!!this.credentional()) {
        return 'loggedin';
      }
      return 'loggedout';
    }
  );

  get User() : UserCredential | null {
    return this.credentional();
  }

  private isPending: WritableSignal<boolean> = signal(false);

  constructor() {}

  loggIn(email: string, pass: string) {
    this.isPending.set(true);
    signInWithEmailAndPassword(this.auth, email, pass)
      .then((userCredential) => {
        this.credentional.set(userCredential);
        this.notificator.NotificateSuccess('Login');
      })
      .catch((error) => {
        this.credentional.set(null);
        this.notificator.NotificateError(
          'Login:  '.concat(JSON.stringify(error))
        );
      })
      .finally(() => {
        this.isPending.set(false);
      });
  }

  logOut() {
    this.isPending.set(true);
    signOut(this.auth)
      .then(() => {
        this.credentional.set(null);
        this.notificator.NotificateSuccess('Logout');
      })
      .finally(() => {
        this.isPending.set(false);
      });
  }

  passwordReset(email: string) {
    this.isPending.set(true);
    sendPasswordResetEmail(this.auth, email)
    .then(()=>{
      this.notificator.NotificateSuccess(`Reset password link was sended to ${email}`);
    })
    .catch((error)=>{
      this.notificator.NotificateError(
        'Reset:  '.concat(JSON.stringify(error))
      );
    })
    .finally(() => {
      this.isPending.set(false);
    });
    ;
  }
}
