import { Component } from '@angular/core';

import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  AlertController,
} from 'ionic-angular';
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

  model: any = {};

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }


  ngOnInit(){
    const usernamePattern="[A-Za-z] .{3,}";
    const emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
    const passwordPattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";

    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)]),

      // name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
    });
  }


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


  public user:User = {};
  public confirm_password: any;
  registerForm;

public login(){

    this.mediaProvider.login(this.user).subscribe(response =>{

      console.log(this.user);
        console.log(response);

        if(response.hasOwnProperty('token')){
          localStorage.setItem("token", response['token']);
          if(localStorage.getItem('token') !== 'undefined'){
            this.mediaProvider.hasLoggedIn = true;
            this.navCtrl.setRoot(HomePage);
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
