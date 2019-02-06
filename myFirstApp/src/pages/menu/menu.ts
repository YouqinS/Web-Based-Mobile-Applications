import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { MediaProvider } from '../../providers/media/media';
import { User } from '../../interfaces/user';


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
    this.checkToken();
  }

  public checkToken(){
      console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token') !== null) {
        this.mediaProvider.checkToken().subscribe((user: User) => {
          this.mediaProvider.user = user;
          this.mediaProvider.hasLoggedIn = true;
        });
      }
  }

  
  
  /*public checkToken(){
    this.mediaProvider.checkToken().subscribe(res=>{
      console.log('check token: ' + res);
      if(res){
       // this.navCtrl.push(this.HomePage);
        this.mediaProvider.hasLoggedIn = true;
        console.log('token: ', localStorage.getItem('token'));
      }
    })
  }*/

}

