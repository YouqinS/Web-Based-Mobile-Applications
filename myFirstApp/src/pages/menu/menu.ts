import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { MediaProvider } from '../../providers/media/media';
import { User } from '../../interfaces/user';
import { UploadPage } from '../upload/upload';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  LoginPage: any;
  HomePage: any;
  ProfilePage: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider) {
    this.LoginPage = LoginPage;
    this.HomePage = HomePage;
    this.ProfilePage = ProfilePage;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MenuPage');

    this.checkToken();
  }

  public checkToken(){
      console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token') !== null) {
        this.mediaProvider.checkToken().subscribe((user: User) => {
          this.mediaProvider.user = user;
          console.log(user.username + " / " + user.user_id);
          this.mediaProvider.hasLoggedIn = true;
          //this.navCtrl.setRoot(HomePage);
          //this.navCtrl.push(HomePage);
        });
      }
  }

}

