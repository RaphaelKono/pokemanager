import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPwInfoComponent } from './dialog-pw-info.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

class MatDialogRefMock {
  // Implementiere hier optional benötigte Methoden oder Eigenschaften
}
class MatDialogDataMock {
  password = ''
}

describe('DialogPwInfoComponent', () => {
  let component: DialogPwInfoComponent;
  let fixture: ComponentFixture<DialogPwInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPwInfoComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useClass: MatDialogDataMock },
      ],
    });
    fixture = TestBed.createComponent(DialogPwInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain at least one small letter', () => {
    component.data = { password: 'aPASSWORD1!' };
    expect(component.containsSmallLetter()).toBeTruthy();
  });

  it('should contain at least one capital letter', () => {
    component.data = { password: 'Apassword1!' };
    expect(component.containsCapitalLetter()).toBeTruthy();
  });

  it('should contain at least one number', () => {
    component.data = { password: 'APassword1!' };
    expect(component.containsNumber()).toBeTruthy();
  });

  it('should contain at least one specialSign', () => {
    component.data = { password: 'APassword1!' };
    expect(component.containsSpecialSign()).toBeTruthy();
  });
});
