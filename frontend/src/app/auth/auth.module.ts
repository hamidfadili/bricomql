import { AuthGuard } from './auth.guard';
import { UserService } from './../core/user.service';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NoAuthGuard } from './no-auth.guard';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],providers: [
    UserService,
    NoAuthGuard,
    AuthGuard
  ]
    
})

export class AuthModule { }
