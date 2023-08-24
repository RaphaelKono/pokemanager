import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyNoteComponent } from './verify-note.component';

describe('VerifyNoteComponent', () => {
  let component: VerifyNoteComponent;
  let fixture: ComponentFixture<VerifyNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyNoteComponent]
    });
    fixture = TestBed.createComponent(VerifyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
