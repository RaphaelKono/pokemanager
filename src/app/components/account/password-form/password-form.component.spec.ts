import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFormComponent } from './password-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('PasswordFormComponent', () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordFormComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
      ]
    });
    fixture = TestBed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    component.fcName = 'password';
    let sharedFormService = TestBed.inject(SharedFormService);
    // component.parentGroup = new FormGroup({
    //   email: sharedFormService.sharedMailFormControl(),
    //   password: sharedFormService.sharedPasswordFormControl(),
    // });
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
});
