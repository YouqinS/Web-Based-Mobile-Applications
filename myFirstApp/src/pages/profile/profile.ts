import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/pic';
import { MyFilesPage } from '../my-files/my-files';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'prifole.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider) {
  }

  ionViewDidLoad() {
  }

  public uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


  goToMyFiles() {
    this.navCtrl.push(MyFilesPage).catch();
  }

public logout(){

  localStorage.clear();
  this.mediaProvider.hasLoggedIn = false;
  this.navCtrl.parent.select(0);

}

}
