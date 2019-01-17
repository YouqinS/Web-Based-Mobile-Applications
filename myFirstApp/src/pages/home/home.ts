import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Pic } from '../../interfaces/pic';
import { stringify } from 'querystring';
import { MediaProvider } from '../../providers/media/media';
import {MediaService} from '../../app/services/media.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private picArray;

  constructor(public navCtrl: NavController, public http: HttpClient, private media:MediaService) {
  }

  ngOnInit(){
    this.media.getAllMedia().subscribe((res:Pic[]) =>{
        console.log(res);
      this.picArray = res;
    });
  }

  public thumbnail: string;
  public mediaPath:string = "http://media.mw.metropolia.fi/wbma/uploads/";
  public getThumbnail(filename){
    return this.thumbnail = this.mediaPath + filename.split(".",1) + "-tn160.png";
    //console.log("thumbnail: " + this.thumbnail);
  }


}
