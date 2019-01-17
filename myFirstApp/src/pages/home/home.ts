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

  constructor(public navCtrl: NavController, private http: HttpClient) {

  }

  ngOnInit(){
    this.getImages();
  }

  private url:string = 'assets/test.json';
  private picArray;

  getImages(){
    this.http.get<Pic[]>(this.url).subscribe(
      (res:Pic[]) =>{
        console.log(res);
        this.picArray = res;
      },
      (error) => {console.log(error)}
      );

    //this.http.get<some_type>('example.json').subscribe((res: some_type) => this.someVariable = res.json());
  }




  /*
  showPhotoViewer(){
    this.photoViewer.show('https://mysite.com/path/to/image.jpg');

    this.photoViewer.show('https://mysite.com/path/to/image.jpg', 'My image title', {share: false});
  }
  */


}
