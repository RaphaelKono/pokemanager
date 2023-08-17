import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent {
  hide = true;

  @Input() parentGroup!: FormGroup;
  @Output() loginFormEvent: EventEmitter<FormGroup> = new EventEmitter;
  password!: FormControl

  constructor(public authService: AuthService, private sharedFormService: SharedFormService){}

  ngOnInit(){
    this.password = this.sharedFormService.sharedPasswordFormControl();
  }

  emitEvent(){
    this.loginFormEvent.emit(this.parentGroup);
  }

  switchVisibility() {
    this.hide = !this.hide;
  }

}
