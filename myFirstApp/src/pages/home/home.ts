import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private picArray:Pic[];
  public uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public navCtrl: NavController, public http: HttpClient, private mediaProvider: MediaProvider) {
  }

  ngOnInit(){
    this.getAllFiles();

  }

  //method 1: split
  /*private thumbnail: string;
    private mediaPath:string = "http://media.mw.metropolia.fi/wbma/uploads/";
    public getThumbnail(filename){
    return this.thumbnail = this.mediaPath + filename.split(".",1) + "-tn160.png";
    //console.log("thumbnail: " + this.thumbnail);
  }*/

/*  getAllFiles(){
    this.mediaProvider.getAllMedia().subscribe((res:Pic[]) =>{
      console.log(res);
      this.picArray = res;
    });
  }*/


//method 2: split && map
  getAllFiles(){
    this.mediaProvider.getAllMedia().subscribe((res:Pic[]) =>{
      console.log(res);

      this.picArray = res.map((pic:Pic)=>{
        const nameArray = pic.filename.split(".");
        pic.thumbnails = {
          160: nameArray[0] + "-tn160.png",
        };
        return pic;
      })

    });
  }




  /*
    getAllFiles(){

      this.mediaProvider.getAllMedia().subscribe((res:Pic[])=>{
       // this.picArray = res;


      })
    }*/

 /* public getThumbnail(file){
    let thumbnail:string;

     this.mediaProvider.getSingleMedia(file.file_id).subscribe((res:Pic)=>{
      thumbnail = "http://media.mw.metropolia.fi/wbma/uploads/" + res.thumbnails['160'];
      console.log("thumbnail: " + thumbnail);
       return thumbnail;
    });

  }*/


}
