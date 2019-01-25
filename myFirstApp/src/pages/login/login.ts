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

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }


  loading: Loading;
  registerCredentials = { username: '', password: '' };


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

    this.mediaProvider.login(this.registerCredentials).subscribe(success => {
        if (success) {

          this.navCtrl.setRoot(HomePage);
         // this.navCtrl.push('HomePage');
          this.navCtrl.popToRoot();

          console.log("why not showing home page")


          } else {
           this.showError("These credentials do not match our records.");
      }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }


}
