import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';


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
   // localStorage.removeItem('token');

    localStorage.clear();
    console.log('logout token ' + localStorage.getItem('token'));

    this.navCtrl.parent.select(0);
    this.mediaProvider.hasLoggedIn = false;
    //this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }




}
