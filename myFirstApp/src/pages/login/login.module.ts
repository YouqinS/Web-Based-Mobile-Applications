import { NgModule } from '@angular/core';
import { FormsModule,Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
    FormsModule,
    FormControl,
    Validators
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
