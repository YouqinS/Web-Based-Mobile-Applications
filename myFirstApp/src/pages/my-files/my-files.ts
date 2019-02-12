import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/pic';
import { PlayerPage } from '../player/player';
import { ModifyPage } from '../modify/modify';

@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  public uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  public mediaArray: Observable<Pic[]>;

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MyFilesPage');
  }


  ngOnInit() {
    this.getAllMediaOfSingleUser();
  }

//using pipe
  getAllMediaOfSingleUser() {
    this.mediaProvider.checkToken().subscribe(user =>{
      console.log('user: ', user);

      this.mediaArray = this.mediaProvider.getAllMediaOfCurrentUser(user.user_id);

      console.log('current user mediaArray: ', this.mediaArray);
    });

  }

  showPhotoViewer(file_id: number) {
    this.navCtrl.push(PlayerPage,{
      file_id: file_id
    })
  }

  goToModifyPage(file_id: number) {
    this.navCtrl.push(ModifyPage,{
      file_id: file_id
    })
  }

  deleteFile(file_id: number) {

  }
}
