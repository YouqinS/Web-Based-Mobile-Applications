import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Media } from '../../interfaces/media';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  ngOnInit(){
    this.getImages();
  }


  //private url:string = 'assets/test.json';
  private url:string='http://Media.mw.metropolia.fi/wbma/media?start=10&limit=20';

  private mediaArray:Media[]=[];
  getImages(){
    this.http.get<Media[]>(this.url).subscribe((res:Media[]) =>{
      console.log(res);
      this.mediaArray = res
    });

    //this.http.get<some_type>('example.json').subscribe((res: some_type) => this.someVariable = res.json());
    console.log('get images');
  }


  public thumbnail: string;
  public mediaPath:string = "http://media.mw.metropolia.fi/wbma/uploads/";
  public getThumbnail(filename){
    return this.thumbnail = this.mediaPath + filename.split(".",1) + "-tn160.png";
    //console.log("thumbnail: " + this.thumbnail);
}

}
