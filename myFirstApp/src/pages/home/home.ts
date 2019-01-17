import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Pic } from '../../interfaces/pic';
import { stringify } from 'querystring';
//import { PhotoViewer } from '@ionic-native/photo-viewer'; , private photoViewer: PhotoViewer


/*class Pic {
  constructor(
    public title: string,
    public details: string,
    public thumbnail: string,
    public original: string,
  ) {
  }

}*/


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.getImages();
  }


  private url:string = 'assets/test.json';
  private picArray;

  getImages(){
    this.http.get<Pic[]>(this.url).subscribe((res:any) =>
     // console.log(res));
      this.picArray = res);

    //this.http.get<some_type>('example.json').subscribe((res: some_type) => this.someVariable = res.json());
    console.log('clicked');
  }





  /*
  showPhotoViewer(){
    this.photoViewer.show('https://mysite.com/path/to/image.jpg');

    this.photoViewer.show('https://mysite.com/path/to/image.jpg', 'My image title', {share: false});
  }
  */


}
