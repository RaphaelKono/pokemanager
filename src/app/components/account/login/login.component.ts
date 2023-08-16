import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  //RFC2822 Email Validation
  validMail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g; 
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.validMail)]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  constructor(public authService: AuthService) {}

  login() {
    if (this.loginForm.invalid) return;
    this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
  }

  switchVisibility() {
    this.hide = !this.hide;
  }
}
