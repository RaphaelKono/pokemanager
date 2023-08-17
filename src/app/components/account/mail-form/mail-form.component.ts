import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedFormService } from 'src/app/services/shared-form/shared-form.service';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss']
})
export class MailFormComponent {
  @Input() parentGroup!: FormGroup;
  @Output() emailEvent: EventEmitter<FormControl> = new EventEmitter;
  @Output() loginFormEvent: EventEmitter<FormGroup> = new EventEmitter;


  email!: FormControl
  form!:FormGroup

  constructor(public authService: AuthService, private sharedFormService: SharedFormService){}

  ngOnInit(){
    this.email = this.sharedFormService.sharedMailFormControl();
  }

  emitEvent(){
    this.loginFormEvent.emit(this.parentGroup);
  }

  

}
