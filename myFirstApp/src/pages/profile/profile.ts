import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/pic';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'prifole.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider) {
  }

  ionViewDidLoad() {
    this.getUserInfo();
  }

  public uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  public user:User;
  public username;
  public email;
  public user_id;

  public getUserInfo(){

     this.mediaProvider.getCurrentUser().subscribe(userInfo =>{
      console.log('user?? ', userInfo);
      this.user = userInfo;

      console.log('username?? ' + this.user.username);
      console.log('user email?? ' + this.user.email);
      console.log('user id?? ' + this.user.user_id);
      this.username = this.user.username;
      this.email = this.user.email;
      this.user_id = this.user.user_id;
      this.getAllMediaOfCurrentUser(this.user_id);
    });
  }

  public getUserInfoAndCallMeBack(funtionToExecuteAfterDone?: () => void){

    this.mediaProvider.getCurrentUser().subscribe(userInfo =>{
      console.log('user?? ', userInfo);
      this.user = userInfo;

      console.log('username?? ' + this.user.username);
      console.log('user email?? ' + this.user.email);
      console.log('user id?? ' + this.user.user_id);
      this.username = this.user.username;
      this.email = this.user.email;
      this.user_id = this.user.user_id;
      funtionToExecuteAfterDone()
    });
  }


  tag = "2plus";
  file_id = 57;
  avatar:string;
public getUserAvatar(){
    return this.mediaProvider.getSingleMedia(this.file_id).subscribe(pic=>{
      console.log('pic? ', pic);
      console.log('thumbnails? ', pic.thumbnails);
      this.avatar = pic.thumbnails.w160;

      this.getUserInfo();
    });
}


  //using pipe
  public mediaArray:Observable<Pic[]>;
  public getAllMediaOfCurrentUser(user_id){

    this.getUserInfoAndCallMeBack(() =>{
      console.log('user id 3?? ' + this.user_id);
      this.mediaArray = this.mediaProvider.getAllMediaOfCurrentUser(user_id);
      console.log('my media array: ', this.mediaArray);
    });
  }

  /*public getAllMediaOfCurrentUser(){

    this.getUserInfoAndCallMeBack(() =>{
      console.log('user id 3?? ' + this.user_id);
      this.mediaArray = this.mediaProvider.getAllMediaOfCurrentUser(514);
      console.log('my media array: ', this.mediaArray);
    });
  }*/




public logout(){

  this.navCtrl.setRoot(LoginPage);

  localStorage.removeItem('token');
  console.log('profile token ' + localStorage.getItem('token'));
  this.mediaProvider.token = localStorage.getItem('token');
  this.mediaProvider.hasLoggedIn = false;

}




}
