import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedFormService {
  strong = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64}/;
  constructor() {}

  sharedMailFormControl(): FormControl {
    return new FormControl('', [Validators.required, Validators.email]);
  }

  sharedPasswordFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.pattern(this.strong),
    ]);
  }

  sharedConfirmedPasswordFormControl(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  sharedSignUpFormGroup(): FormGroup {
    return new FormGroup(
      {
        email: this.sharedMailFormControl(),
        password1: this.sharedPasswordFormControl(),
        password2: this.sharedPasswordFormControl(),
      },
      { validators: this.passwordConfirming }
    );
  }

  passwordConfirming: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');
    if (password1 && password2 && password1.value !== password2.value) {
      return { invalid: true, valid: false };
    }
    return null;
  };
}
