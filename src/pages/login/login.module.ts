import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { RegisterPage } from '../register/register';

@NgModule({
  declarations: [
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    IonicPageModule.forChild(RegisterPage)
  ],
})
export class LoginPageModule {}
