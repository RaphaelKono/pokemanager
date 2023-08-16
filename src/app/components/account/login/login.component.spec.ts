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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const emailValidationTests = [
    {value: null, valid: false},
    {value: '', valid: false},
    {value: 'user', valid: false},
    {value: 'user.com', valid: false},
    {value: 'user@mail', valid: false},
    {value: 'user@mail.com', valid: true},
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should turn visibility on', () => {
    component.hide = true;
    component.switchVisibility();
    expect(component.hide).toBe(false);
  });

  it('should turn visibility off', () => {
    component.hide = false;
    component.switchVisibility();
    expect(component.hide).toBe(true);
  });

  emailValidationTests.forEach(test => {
    it(`should validate the email address ${test.value}`, () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.patchValue(test.value);
      fixture.detectChanges();
      expect(emailControl?.valid).toBe(test.valid);
    })
  })
  
});
