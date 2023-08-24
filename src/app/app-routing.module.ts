import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/auth-routes/login/login.component';
import { ClientComponent } from './components/client/client.component';
import { authGuard } from './core/auth.guard';
import { AuthRoutesComponent } from './components/account/auth-routes/auth-routes.component';
import { SignUpComponent } from './components/account/auth-routes/sign-up/sign-up.component';
import { VerifyNoteComponent } from './components/account/auth-routes/verify-note/verify-note.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthRoutesComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'verification', component: VerifyNoteComponent },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    ],
  },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
