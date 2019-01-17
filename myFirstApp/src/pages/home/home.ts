import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Pic } from '../../interfaces/pic';
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
  private url:string='http://media.mw.metropolia.fi/wbma/media';

  private picArray:Pic[]=[];
  getImages(){
    this.http.get<Pic[]>(this.url).subscribe((res:any) =>
    //  console.log(res));
    this.picArray = res);

    //this.http.get<some_type>('example.json').subscribe((res: some_type) => this.someVariable = res.json());
    console.log('get images');
  }



  /*
  showPhotoViewer(){
    this.photoViewer.show('https://mysite.com/path/to/image.jpg');

    this.photoViewer.show('https://mysite.com/path/to/image.jpg', 'My image title', {share: false});
  }
  */


}
