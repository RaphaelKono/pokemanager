import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid?: string;
  errorCode?: string;

  constructor(
    private auth: Auth,
    private zone: NgZone,
    private router: Router
  ) {}

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => this.setLoginPass(userCredential))
      .catch((error) => this.setLoginError(error.code));
  }

  setLoginPass(userCredential: UserCredential) {
    this.uid = userCredential.user.uid;
    this.router.navigate(['/client']);
  }

  setLoginError(errorCode: string) {
    this.errorCode = errorCode;
    console.log(this.errorCode);
  }

  isLoggedIn() {
    return new Promise<boolean>(async (resolve, reject) => {
      this.auth.onAuthStateChanged(async (user) => {
        if (!user) {
          await this.zone.run(() => this.router.navigate(['/auth/login']));
          resolve(false);
        }
        this.uid = this.auth.currentUser?.uid;
        resolve(true);
      });
    });
  }

  async signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((user: UserCredential) => this.setSignUpPass(user))
      .catch((error) => this.setSignUpError(error.code));
  }

  setSignUpPass(user: UserCredential) {
    this.initEmailVerification(user);
  }

  setSignUpError(errorCode: string) {
    console.log('error', errorCode);
    this.errorCode = errorCode;
  }

  async initEmailVerification(user: UserCredential) {
    await sendEmailVerification(user.user).then(() => {
      this.router.navigate(['/auth/verification']);
    });
  }

  resetErrorCode() {
    this.errorCode = '';
  }
}
