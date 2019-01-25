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
  registerCredentials = { name: '', email: '', password: '', confirmation_password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public mediaProvider:MediaProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
  }


  public register() {
    if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
      this.showPopup("Error", ' password  does not match.');
    } else {
      this.mediaProvider.register(this.registerCredentials).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Success", "Account created.");
            this.navCtrl.setRoot(HomePage);
          } else {
            this.showPopup("Error", "Problem creating account.");
          }
        },
        error => {
          this.showPopup("Error", error);
        });
    }
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

