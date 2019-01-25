import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { HomePage } from '../home/home';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  LoginPage: any;
  HomePage: any;
  LogoutPage: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider) {
    this.LoginPage = LoginPage;
    this.HomePage = HomePage;
    this.LogoutPage = LogoutPage;
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad MenuPage');
    this.checkToken();
  }

  public checkToken(){
    this.mediaProvider.checkToken().subscribe(success =>{
      this.mediaProvider.hasLoggedIn = true;
     // this.navCtrl.setRoot(HomePage);
  })
  }
}

