import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailFormComponent } from './mail-form.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../auth-routes/login/login.component';
import { inject } from '@angular/core';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';

describe('MailFormComponent', () => {
  let component: MailFormComponent;
  let fixture: ComponentFixture<MailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailFormComponent, LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ],
    });
    fixture = TestBed.createComponent(MailFormComponent);
    component = fixture.componentInstance;
    let sharedFormService = TestBed.inject(SharedFormService);
    // component.email = new FormGroup({
    //   email: sharedFormService.sharedMailFormControl(),
    //   password: sharedFormService.sharedPasswordFormControl()
    // });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
