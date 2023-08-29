import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPwInfoComponent } from '../dialogs/dialog-pw-info/dialog-pw-info.component';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['../auth-routes/auth-routes.component.scss'],
})
export class PasswordFormComponent {
  hide = true;

  @Input() fcName!: string;
  @Output() refreshFormEvent: EventEmitter<string> = new EventEmitter();
  password!: FormControl;

  constructor(public authService: AuthService, public dialog: MatDialog, private sharedFormService: SharedFormService) {}

  ngOnInit(){
    this.password = this.sharedFormService.sharedPasswordFormControl();
  }

  emitEvent() {
    this.refreshFormEvent.emit(this.password.value);
  }

  switchVisibility() {
    this.hide = !this.hide;
  }

  openDialog() {
    this.dialog.open(DialogPwInfoComponent, {
      data: {
        password: this.password.value,
      },
    });
  }

  noPw() {
    return (
      this.fcName === 'password1' &&
      this.password.value === null ||
      this.password.value === ''
    );
  }

  noValidPW(){
    return this.fcName === 'password1' && this.noPw() && !this.sharedFormService.strong.test(this.password.value);
  }
}
