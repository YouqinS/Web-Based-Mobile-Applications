import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/pic';
import { User } from '../../interfaces/user';

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    this.file_id = this.navParams.get('file_id');
  }

  public uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  public file:Pic;
  public file_id;
  public username;
  ionViewDidLoad() {
   // console.log('ionViewDidLoad PlayerPage');
  }


  ngOnInit(){
    this.getSingleMedia();
  }


  getSingleMedia(){
    console.log('file_id: ', this.file_id);
    this.mediaProvider.getSingleMedia(this.file_id).subscribe(singleMedia =>{

      console.log('view single media: ', singleMedia);

      this.file = singleMedia;
      console.log('media type: ', this.file.media_type);
      console.log('user id: ', this.file.user_id);
      console.log('file description: ', this.file.description);

      this.mediaProvider.getUserInfoOfSingleFile(this.file.user_id).subscribe(userInfo=>{
        console.log('single media user info: ', userInfo);

        this.username = userInfo.username;

    });
  })
  }



}
