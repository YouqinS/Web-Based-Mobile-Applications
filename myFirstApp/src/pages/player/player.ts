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
  ionViewDidLoad() {
   // console.log('ionViewDidLoad PlayerPage');
  }


  ngOnInit(){
    this.getSingleMedia();
  }


  getSingleMedia(){
    console.log('file_id: ', this.file_id);
    this.mediaProvider.getSingleMedia(this.file_id).subscribe(singleMedia =>{

      console.log('view single media: ' + singleMedia);

      this.file = singleMedia;


    })
  }

  //method 1: split
  private thumbnail: string;
    private mediaPath:string = "http://media.mw.metropolia.fi/wbma/uploads/";
    public getThumbnail(filename){
    return this.thumbnail = this.mediaPath + filename.split(".",1) + "-tn160.png";
    //console.log("thumbnail: " + this.thumbnail);
  }


  /*getAllMediaOfCurrentUser(){
    this.mediaArray = this.mediaProvider.getAllMediaOfSingleUser();

     console.log(this.mediaArray);

  }*/



}
