import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedFormService {
  validMail: RegExp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  constructor(private fb: FormBuilder) {}

  sharedForm(): FormGroup {
    const fg = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.validMail)]],
    });
    return fg;
  }
}
