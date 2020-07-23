import { InformationsPersonnelleComponent } from './profile/devenir-bricoleur/informations-personnelle/informations-personnelle.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { NoAuthGuard } from './no-auth.guard';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { DevenirBricoleurComponent } from './profile/devenir-bricoleur/devenir-bricoleur.component';
import { InformationsBricoleurComponent } from './profile/devenir-bricoleur/informations-bricoleur/informations-bricoleur.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [NoAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate : [NoAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'profile/change-password',
    component: ChangePasswordComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'profile/devenir-bricoleur/informations-personnelle',
    component: InformationsPersonnelleComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'profile/devenir-bricoleur/informations-bricoleur',
    component: InformationsBricoleurComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
