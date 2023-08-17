import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRoutesComponent } from './auth-routes.component';
import { MatCardModule } from '@angular/material/card';
import {
  ActivatedRoute,
  RouterModule,
  convertToParamMap,
} from '@angular/router';

describe('AuthRoutesComponent', () => {
  let component: AuthRoutesComponent;
  let fixture: ComponentFixture<AuthRoutesComponent>;

  beforeEach(() => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({}),
      },
    };
    TestBed.configureTestingModule({
      declarations: [AuthRoutesComponent],
      imports: [MatCardModule, RouterModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    });
    fixture = TestBed.createComponent(AuthRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
