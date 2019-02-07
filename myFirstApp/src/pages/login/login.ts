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
              private loadingCtrl: LoadingController
  ) {  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  public showRegisterForm:Boolean = false;
  public createAccount() {
    //this.navCtrl.push('RegisterPage');
    this.showRegisterForm = true;
    console.log('show register form');
  }



  public user:User = {};

  public login(){

    this.mediaProvider.login(this.user).subscribe(response =>{

      console.log('user: ', this.user);

        console.log('login res: ', response);

        if(response.hasOwnProperty('token')){
          localStorage.setItem("token", response['token']);

          if(localStorage.getItem('token') !== 'undefined'){
            this.mediaProvider.hasLoggedIn = true;
            this.navCtrl.setRoot(HomePage);

            this.user = response["user"];
            console.log(response["user"]);
            console.log(this.user.username);
            console.log(this.user.email);

            localStorage.setItem("username", this.user.username);
            localStorage.setItem("useremail", this.user.email);

            console.log('username2', localStorage.getItem('username'));

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
    if(this.user.username !== null){
      this.checkUsername();
    }
  this.mediaProvider.register(this.user).subscribe(response =>{
    console.log(response);

      if(response.hasOwnProperty('user_id')){
        console.log(this.user.user_id);
        this.login();
      }
    },
    error => {
      console.log(error);
    });
}


public checkUsername(){
    console.log('checking username??');
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

}
