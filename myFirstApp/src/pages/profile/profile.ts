import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/pic';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'prifole.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider) {
  }

  ionViewDidLoad() {
   // this.getUserInfo();
  }

  public uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';



public logout(){

  localStorage.clear();
  this.mediaProvider.hasLoggedIn = false;
  this.navCtrl.parent.select(0);

}


  // public user:User;
  // public username;
  // public email;
  // public user_id;
  //
  // public getUserInfo(){
  //
  //    this.mediaProvider.getCurrentUser().subscribe(userInfo =>{
  //     console.log('user?? ', userInfo);
  //     this.user = userInfo;
  //
  //     console.log('username?? ' + this.user.username);
  //     console.log('user email?? ' + this.user.email);
  //     console.log('user id?? ' + this.user.user_id);
  //
  //     this.username = this.user.username;
  //     this.email = this.user.email;
  //     this.user_id = this.user.user_id;
  //
  //   });
  // }

  //using pipe
  /*public mediaArray:Observable<Pic[]>;
  public getAllMediaOfCurrentUser(user_id){

      console.log('user id 3?? ' + this.user_id);
      this.mediaArray = this.mediaProvider.getAllMediaOfCurrentUser(user_id);
      console.log('my media array: ', this.mediaArray);
  }*/


  /*public getUserInfoAndCallMeBack(funtionToExecuteAfterDone?: () => void){

    this.mediaProvider.getCurrentUser().subscribe(userInfo =>{
      console.log('user?? ', userInfo);
      this.user = userInfo;

      console.log('username?? ' + this.user.username);
      console.log('user email?? ' + this.user.email);
      console.log('user id?? ' + this.user.user_id);
      this.username = this.user.username;
      this.email = this.user.email;
      this.user_id = this.user.user_id;
      funtionToExecuteAfterDone();
    });
  }*/

  /*public getAllMediaOfCurrentUser(){

    this.getUserInfoAndCallMeBack(() =>{
      console.log('user id 3?? ' + this.user_id);
      this.mediaArray = this.mediaProvider.getAllMediaOfCurrentUser(514);
      console.log('my media array: ', this.mediaArray);
    });
  }*/




}
