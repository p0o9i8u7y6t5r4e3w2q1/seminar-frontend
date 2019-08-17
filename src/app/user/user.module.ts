import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { UserRoutingModule } from './user-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, SignupComponent, ForgetPasswordComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
