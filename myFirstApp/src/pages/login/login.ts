import { Component } from '@angular/core';
import {
  IonicPage,
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
    this.showRegisterForm = true;
    console.log('show register form');
  }


  loginCredentials = { username: '', password: '' };
  public login() {

    this.mediaProvider.login(this.loginCredentials).subscribe(res => {

        console.log(' login response:' + res);

        if (res) {

          this.mediaProvider.hasLoggedIn = true;

          this.navCtrl.setRoot(HomePage);
         // this.navCtrl.push(HomePage);

        } else {
          alert("These credentials do not match our records.");
      }
      },
      error => {
      console.log(error);
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

}
