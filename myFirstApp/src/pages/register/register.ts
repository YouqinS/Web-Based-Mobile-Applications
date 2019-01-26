import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;
  registerCredentials = { username: '', email: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public mediaProvider:MediaProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
  }


  public register() {
      this.mediaProvider.register(this.registerCredentials).subscribe(res => {
        console.log('register res: ' + res);
          if (res) {
            this.navCtrl.push(HomePage);
            this.mediaProvider.hasLoggedIn = true;
          } else {
            this.showPopup("Error", "Problem creating account.");
          }
        },

        error => {
          this.showPopup("Error", error);
        });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


}

