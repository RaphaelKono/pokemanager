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

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  constructor(private authService: AuthService) {}

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
