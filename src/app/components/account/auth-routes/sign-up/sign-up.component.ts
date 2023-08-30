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
    this.signUpForm = this.sharedFormService.sharedSignUpFormGroup();
  }

  signUp() {
    if (this.signUpForm.invalid) return;
    this.authService.signUp(
      this.signUpForm.value.email!,
      this.signUpForm.value.password1!
    );
  }

  refreshEmail($event: string){
    this.signUpForm.patchValue({
      email: $event
    });
  }

  refreshPassword1($event: string){
    this.signUpForm.patchValue({
      password1: $event
    });
  }

  refreshPassword2($event: string){
    this.signUpForm.patchValue({
      password2: $event
    });
  }

}
