import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  Auth,
  deleteUser,
  getAuth,
  provideAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

const loginTests = [
  {
    test: 'setLoginPass',
    email: environment.guest.email,
    password: environment.guest.password,
    it: 'valid and existing user',
  },
  {
    test: 'setLoginError',
    email: 'user@email.com',
    password: environment.guest.password,
    it: 'non existing user',
  },
  {
    test: 'setLoginError',
    email: environment.guest.email,
    password: 'asdfGh1!3',
    it: 'wrong password',
  },
];

describe('AuthService Login Tests', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  loginTests.forEach((test) => {
    it(`should call ${test.test} function for a ${test.it}`, async () => {
      const innerFunctionSpy = spyOn(
        service,
        test.test as keyof typeof service
      );
      await service.login(test.email, test.password);
      expect(innerFunctionSpy).toHaveBeenCalled();
    });
  });

  it('should set uid and change path for a valid and existing user', () => {
    const spy = spyOn(router, 'navigate');
    service.setLoginPass(environment.guest.uid);
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

  it(`should call signUpPass function for a valid mail address`, async () => {
    const innerFunctionSpy = spyOn(service, 'setSignUpPass');
    await service.signUp(
      environment.testGuest.email,
      environment.testGuest.password
    );
    expect(innerFunctionSpy).toHaveBeenCalled();
  });

  // it('should set uid and change path for a valid and existing user', () => {
  //   const spy = spyOn(router, 'navigate');
  //   service.setLoginPass(environment.guest.uid);
  //   expect(service.uid).toBe(environment.guest.uid);
  //   expect(spy).toHaveBeenCalledOnceWith(['/client']);
  // });

  // it('should call user not found', async () => {
  //   await service.login('user@gmail.com', 'nobodY8!');
  //   expect(service.errorCode).toBe('auth/user-not-found');
  // });

  // it('should call user not found', async () => {
  //   await service.login(environment.guest.email, 'nobodY8!');
  //   expect(service.errorCode).toBe('auth/wrong-password');
  // });
})
