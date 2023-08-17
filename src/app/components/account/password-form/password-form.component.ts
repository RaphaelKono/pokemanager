import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['../auth-routes/auth-routes.component.scss'],
})
export class PasswordFormComponent {
  hide = true;

  @Input() parentGroup!: FormGroup;
  @Input() fcName!: string;
  @Output() refreshFormEvent: EventEmitter<FormGroup> = new EventEmitter();
  password!: FormControl;

  constructor(public authService: AuthService) {}

  emitEvent() {
    this.refreshFormEvent.emit(this.parentGroup);
  }

  switchVisibility() {
    this.hide = !this.hide;
  }

  noPw(){
    return this.parentGroup.value.fcName === null || this.parentGroup.value.fcName === '';
  }
}
