import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface PasswordData {
  password: string;
}

@Component({
  selector: 'app-dialog-pw-info',
  templateUrl: './dialog-pw-info.component.html',
  styleUrls: ['./dialog-pw-info.component.scss'],
})
export class DialogPwInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPwInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordData
  ) {}

  ngOnInit(){
    console.log(this.data);
  }

  containsNumber() {
    return /\d+/.test(this.data.password);
  }

  containsSmallLetter() {
    return /[a-z]+/.test(this.data.password);
  }

  containsCapitalLetter() {
    return /[A-Z]+/.test(this.data.password);
  }

  containsSpecialSign() {
    return /[\W_]+/.test(this.data.password);
  }

  tooShort() {
    return this.data.password.length < 8;
  }
}
