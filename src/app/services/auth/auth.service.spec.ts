import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  Auth,
  UserCredential,
  deleteUser,
  getAuth,
  provideAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

const loginErrorTests = [
  {
    email: 'user@email.com',
    password: environment.guest.password,
    it: 'non existing user',
  },
  {
    email: environment.guest.email,
    password: 'asdfGh1!3',
    it: 'wrong password',
  },
];

const mockUserCredential = {
  user: {
    uid: environment.guest.uid
  }
}

describe('AuthService Login Tests', () => {
  let service: AuthService;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  loginErrorTests.forEach((test) => {
    it(`should call setLoginError function for a ${test.it}`, async () => {
      const innerFunctionSpy = spyOn(service, 'setLoginError');
      await service.login(test.email, test.password);
      expect(innerFunctionSpy).toHaveBeenCalled();
    });
  });

  it('should call the loginPassFunction for a valid and existing user', async () => {
    const innerFunctionSpy = spyOn(service, 'setLoginPass');
    await service.login(environment.guest.email, environment.guest.password);
    expect(innerFunctionSpy).toHaveBeenCalled();
  });

  it('should set uid and change path for a valid and existing user', () => {
    const spy = spyOn(router, 'navigate');
    service.setLoginPass(mockUserCredential as UserCredential);
    expect(service.uid).toBe(environment.guest.uid);
    expect(spy).toHaveBeenCalledOnceWith(['/client']);
  });

  it('should call user not found', async () => {
    await service.login('user@gmail.com', 'nobodY8!');
    expect(service.errorCode).toBe('auth/user-not-found');
  });

  it('should call user not found', async () => {
    await service.login(environment.guest.email, 'nobodY8!');
    expect(service.errorCode).toBe('auth/wrong-password');
  });
});

describe('AuthService SignUp Tests', () => {
  let service: AuthService;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it(`should call signUpPass function for a valid form if email is not already in use`, async () => {
    const innerFunctionSpy = spyOn(service, 'setSignUpPass');
    await service.signUp(
      environment.testGuest.email,
      environment.testGuest.password
    );
    if (service.errorCode === 'auth/email-already-in-use') return;
    expect(innerFunctionSpy).toHaveBeenCalled();
  });

  it(`should call setSignUpError function for a valid form if email is already in use`, async () => {
    const innerFunctionSpy = spyOn(service, 'setSignUpError');
    await service.signUp(environment.guest.email, environment.guest.password);
    expect(innerFunctionSpy).toHaveBeenCalled();
  });
});
