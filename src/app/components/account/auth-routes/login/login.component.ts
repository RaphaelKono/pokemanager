import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private sharedFormService: SharedFormService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.sharedFormService.sharedMailFormControl(),
      password: this.sharedFormService.sharedPasswordFormControl(),
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
  }

  refreshEmail($event: string) {
    this.loginForm.patchValue({
      email: $event,
    });
  }

  refreshPassword($event: string) {
    this.loginForm.patchValue({
      password: $event,
    });
  }
}
