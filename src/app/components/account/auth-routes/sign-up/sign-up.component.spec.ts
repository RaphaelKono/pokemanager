import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { MailFormComponent } from '../../mail-form/mail-form.component';
import { PasswordFormComponent } from '../../password-form/password-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  ActivatedRoute,
  RouterModule,
  convertToParamMap,
} from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let sharedFormService: SharedFormService;
  let authService: AuthService;

  beforeEach(() => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({}),
      },
    };
    TestBed.configureTestingModule({
      declarations: [SignUpComponent, MailFormComponent, PasswordFormComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatDialogModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        MatDialog,
      ],
    });
    fixture = TestBed.createComponent(SignUpComponent);
    sharedFormService = TestBed.inject(SharedFormService);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with a signUpForm from Service', () => {
    expect(component).toBeTruthy();
    expect(component.signUpForm instanceof FormGroup).toBeTruthy();
  });

  it('should call signUp function in auth service for a valid form', () => {
    patchValues();
    fixture.detectChanges();
    const authSpy = spyOn(authService, 'signUp');
    component.signUp();
    expect(authSpy).toHaveBeenCalled();
  });

  it('should update signUpForm when child components emit changes', () => {
    const email = 'test@example.com';
    const password = 'testpassword';

    const mailForm = fixture.debugElement.query(
      (debugEl) => debugEl.name === 'app-mail-form'
    );
    mailForm.componentInstance.refreshFormEvent.emit(email);

    const passwordForm = fixture.debugElement.queryAll(
      (debugEl) => debugEl.name === 'app-password-form'
    );
    passwordForm[0].componentInstance.refreshFormEvent.emit(password);
    passwordForm[1].componentInstance.refreshFormEvent.emit(password);

    fixture.detectChanges();

    expect(component.signUpForm.value.email).toBe(email);
    expect(component.signUpForm.value.password1).toBe(password);
    expect(component.signUpForm.value.password2).toBe(password);
  });

  function patchValues(){
    const emailControl = component.signUpForm.get('email');
    const password1Control = component.signUpForm.get('password1');
    const password2Control = component.signUpForm.get('password2');
    emailControl?.patchValue(environment.guest.email);
    password1Control?.patchValue(environment.guest.password);
    password2Control?.patchValue(environment.guest.password);
  }
});


