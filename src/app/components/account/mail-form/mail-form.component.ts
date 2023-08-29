import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['../auth-routes/auth-routes.component.scss'],
})
export class MailFormComponent {
  @Output() refreshFormEvent: EventEmitter<string> = new EventEmitter();

  email!: FormControl;

  constructor(
    public authService: AuthService,
    private sharedFormService: SharedFormService
  ) {}

  ngOnInit() {
    this.email = this.sharedFormService.sharedMailFormControl();
  }

  emitEvent() {
    this.refreshFormEvent.emit(this.email.value);
    this.authService.resetErrorCode();
  }

  noMailAdress() {
    return this.email.value === null || this.email.value === '';
  }
}
