import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/auth-routes/login/login.component';
import { ClientComponent } from './components/client/client.component';
import { MailFormComponent } from './components/account/mail-form/mail-form.component';
import { PasswordFormComponent } from './components/account/password-form/password-form.component';
import { AuthRoutesComponent } from './components/account/auth-routes/auth-routes.component';
import { SignUpComponent } from './components/account/auth-routes/sign-up/sign-up.component';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


import { environment } from '../environments/environment';

//Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { DialogPwInfoComponent } from './components/account/dialogs/dialog-pw-info/dialog-pw-info.component';
import { VerifyNoteComponent } from './components/account/auth-routes/verify-note/verify-note.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, ClientComponent, MailFormComponent, PasswordFormComponent, AuthRoutesComponent, SignUpComponent, DialogPwInfoComponent, VerifyNoteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
