import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['../auth-routes/auth-routes.component.scss']
})
export class MailFormComponent {
  @Input() parentGroup!: FormGroup;
  @Output() refreshFormEvent: EventEmitter<FormGroup> = new EventEmitter;


  email!: FormControl
  form!:FormGroup

  constructor(public authService: AuthService){}

  emitEvent(){
    this.refreshFormEvent.emit(this.parentGroup);
    this.authService.resetErrorCode();
  }


  noMailAdress(){
    return this.parentGroup.value.email === null || this.parentGroup.value.email === '';
  }

}
