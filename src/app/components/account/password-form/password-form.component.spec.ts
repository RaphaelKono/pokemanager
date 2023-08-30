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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogPwInfoComponent } from '../dialogs/dialog-pw-info/dialog-pw-info.component';
import { By } from '@angular/platform-browser';

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
      ],
    });
    fixture = TestBed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    component.fcName = 'password';
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

  it('should open dialog when openDialog is called', () => {
    const dialog = TestBed.inject(MatDialog);
    const openDialogSpy = spyOn(dialog, 'open');
    component.openDialog();
    expect(openDialogSpy).toHaveBeenCalledWith(DialogPwInfoComponent, {
      data: {
        password: component.password.value,
      },
    });
  });

  it('should emit refreshFormEvent with correct value when input changes', () => {
    const emitter = spyOn(component.refreshFormEvent, 'emit');
    const input = fixture.debugElement.query(By.css(`[data-testid=${component.fcName}]`)).nativeElement;
    const testValue = 'testPassword1!';
    input.value = testValue;
    input.dispatchEvent(new Event('input'));
    expect(emitter).toHaveBeenCalledOnceWith(testValue);
  });
});
