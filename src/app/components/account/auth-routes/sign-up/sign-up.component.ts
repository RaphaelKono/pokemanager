import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private sharedFormService: SharedFormService
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup(
      {
        email: this.sharedFormService.sharedMailFormControl(),
        password1: this.sharedFormService.sharedPasswordFormControl(),
        password2: this.sharedFormService.sharedPasswordFormControl(),
      },
      { validators: this.passwordConfirming }
    );
  }

  signUp() {
    // if (this.signUpForm.invalid) return;
    // this.authService.signUp(
    //   this.signUpForm.value.email!,
    //   this.signUpForm.value.password!
    // );
    console.log('Email: ', this.signUpForm.value.email);
    console.log('Password1: ', this.signUpForm.value.password1);
    console.log('Password2: ', this.signUpForm.value.password2);
    console.log(this.signUpForm.valid)
  }

  refreshForm($event: FormGroup) {
    this.signUpForm = $event;
  }

  passwordConfirming: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');
    console.log(password1!.value,' und ', password2!.value);
    if (password1 && password2 && password1.value !== password2.value) {
      return { invalid: true, valid: false };
    }
    return null;
  };
}
