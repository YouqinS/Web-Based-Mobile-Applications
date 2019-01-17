import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Media } from '../../interfaces/media';
import { stringify } from 'querystring';
//import { PhotoViewer } from '@ionic-native/photo-viewer'; , private photoViewer: PhotoViewer




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.getImages();
  }



  //private url:string = 'assets/test.json';
  private url:string='http://Media.mw.metropolia.fi/wbma/media';

  private mediaArray:Media[]=[];
  getImages(){
    this.http.get<Media[]>(this.url).subscribe((res:any) =>
    //  console.log(res));
    this.mediaArray = res);

    //this.http.get<some_type>('example.json').subscribe((res: some_type) => this.someVariable = res.json());
    console.log('get images');
  }


}
