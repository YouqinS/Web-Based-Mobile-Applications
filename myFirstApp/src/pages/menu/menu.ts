import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { HomePage } from '../home/home';
import { MediaProvider } from '../../providers/media/media';


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
    this.mediaProvider.checkToken().subscribe(res=>{
      console.log('check token: ' + res);
      if(res){
        //this.navCtrl.setRoot(this.HomePage);
        //this.navCtrl.push(this.HomePage);
        this.mediaProvider.hasLoggedIn = true;
      }

    })
  }

}

