import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedFormService {
  constructor() {}

  sharedMailFormControl(): FormControl {
    return new FormControl('', [Validators.required, Validators.email]);
  }

  sharedPasswordFormControl(): FormControl {
    return new FormControl('', [Validators.required]);
  }
}
