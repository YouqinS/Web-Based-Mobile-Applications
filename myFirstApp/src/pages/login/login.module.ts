import { NgModule } from '@angular/core';
import {
  FormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    LoginPage,
    FormsModule,
    FormControl,
    Validators
  ],
  imports: [
    BrowserModule,
    IonicPageModule.forChild(LoginPage),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPageModule {}
