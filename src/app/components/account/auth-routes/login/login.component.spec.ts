import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MailFormComponent } from '../../mail-form/mail-form.component';
import { PasswordFormComponent } from '../../password-form/password-form.component';
import {
  ActivatedRoute,
  RouterModule,
  convertToParamMap,
} from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const emailValidationTests = [
    { value: null, valid: false },
    { value: '', valid: false },
    { value: 'user', valid: false },
    { value: 'user.com', valid: false },
    { value: 'user@mail.com', valid: true },
  ];

  beforeEach(() => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({}),
      },
    };
    TestBed.configureTestingModule({
      declarations: [LoginComponent, MailFormComponent, PasswordFormComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  emailValidationTests.forEach((test) => {
    it(`should validate the email address ${test.value}`, () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.patchValue(test.value);
      fixture.detectChanges();
      expect(emailControl?.valid).toBe(test.valid);
    });
  });
});
