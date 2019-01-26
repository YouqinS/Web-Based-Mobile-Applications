import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider) {
  }

  ionViewDidLoad() {
    this.logout();
  }


  public logout(){

    this.navCtrl.setRoot(LoginPage);

    localStorage.removeItem('token');
    console.log('logout token ' + localStorage.getItem('token'));
    this.mediaProvider.token = localStorage.getItem('token');
    this.mediaProvider.hasLoggedIn = false;

  }




}
