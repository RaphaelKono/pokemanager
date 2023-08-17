import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  loginForm!: FormGroup;

  constructor(public authService: AuthService, private sharedFormService: SharedFormService) {
    
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.sharedFormService.sharedMailFormControl(),
      password: this.sharedFormService.sharedPasswordFormControl()
    })
  }

  login() {
    if (this.loginForm.invalid) return;
    this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
  }

  onSubmitMail($event: FormControl){
    this.loginForm.controls['email'] = $event;
    console.log(this.loginForm);
  }

  onSubmitPassword($event: FormControl){
    this.loginForm.controls['password'] = $event;
    console.log(this.loginForm);

  }

  onSubmitForm($event: FormGroup){
    this.loginForm = $event;
    console.log(this.loginForm);
  }
}
