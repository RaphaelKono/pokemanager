import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid?: string;

  constructor(
    private auth: Auth,
    private zone: NgZone,
    private router: Router
  ) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => this.setCorrectLogin(userCredential))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  setCorrectLogin(userCredential: UserCredential) {
    this.uid = userCredential.user.uid;
    this.router.navigate(['/client']);
  }

  isLoggedIn() {
    return new Promise<boolean>(async (resolve, reject) => {
      this.auth.onAuthStateChanged(async (user) => {
        if (!user) {
          await this.zone.run(() => this.router.navigate(['/login']));
          resolve(false);
        }
        this.uid = this.auth.currentUser?.uid;
        resolve(true);
      });
    });
  }
}
