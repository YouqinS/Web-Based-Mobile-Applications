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


  loading: Loading;
  loginCredentials = { username: '', password: '' };


  public userLogin(){

    let user:User = {};

    this.mediaProvider.userLogin(user).subscribe(response =>{
        console.log(response);

        if(response.hasOwnProperty('token')){
          localStorage.setItem("token", response['token']);
          this.mediaProvider.hasLoggedIn = true;
          this.navCtrl.setRoot(HomePage);
        }else {

        }

    },
      error => {
      console.log(error);
      }
    )
  }




  public login() {
    //this.showLoading();

    this.mediaProvider.login(this.loginCredentials).subscribe(res => {

        console.log(' login response:' + res);

        if (res) {

          this.mediaProvider.hasLoggedIn = true;

          this.navCtrl.setRoot(HomePage);
         // this.navCtrl.push(HomePage);

        } else {
          alert("These credentials do not match our records.");
          // this.showError("These credentials do not match our records.");
      }
      },
      error => {
      console.log(error);
       // this.showError(error);
      });
  }


  registerCredentials = { username: '', email: '', password: '' };
  public register() {
    this.mediaProvider.register(this.registerCredentials).subscribe(res => {
        console.log('register res: ' + res);
        if (res) {
          this.loginCredentials = this.registerCredentials;
          console.log(this.loginCredentials);
          this.login();
        } else {
          alert("Error: Problem creating account.");
        }
      },

      error => {
        alert(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  /*showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }*/


}
