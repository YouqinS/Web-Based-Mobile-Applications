import { NgModule,
  Component,
  OnInit,
  ViewChild } from '@angular/core';

import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  AlertController,
} from 'ionic-angular';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private mediaProvider: MediaProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
  ) {  }


  public user:User = {};
  public confirm_password: any;
  @ViewChild('registerForm') registerForm: any;

  public showRegisterForm:Boolean = false;
  public createAccount() {
    //this.navCtrl.push('RegisterPage');
    this.showRegisterForm = true;
    console.log('show register form');
  }
  showLoginForm() {
    console.log('show login form');
    if(this.showRegisterForm == true){
      this.showRegisterForm = false
    }
  }




public login(){

    this.mediaProvider.login(this.user).subscribe(response =>{

      console.log(this.user);
        console.log(response);

        if(response.hasOwnProperty('token')){
          localStorage.setItem("token", response['token']);
          if(localStorage.getItem('token') !== 'undefined'){
            this.mediaProvider.hasLoggedIn = true;
            //this.navCtrl.setRoot(HomePage);
            this.navCtrl.push(HomePage);
          }
        }else {
          alert('login failed');
        }
    },
      error => {
      console.log(error);
      }
    )
  }



public register(){
  this.mediaProvider.register(this.user).subscribe(response =>{
    console.log(response);

      if(response.hasOwnProperty('user_id')){
        this.login();
        console.log('reset form');
        this.registerForm.reset();
      }
    },
    error => {
      console.log(error);
    });
}


public checkUsername(){
    console.log('checking username?');
    this.mediaProvider.checkUsername(this.user.username).subscribe(response=>{
      console.log(response);
      console.log(response['username']);
      console.log(response['available']);
      if (response['available'] === false){
        alert('username exists already!');
        return;
      }
    })
}

public verifyPassword(){
    if(this.user.password !== this.confirm_password){
      alert('passwords do not match');
    }
}





}
