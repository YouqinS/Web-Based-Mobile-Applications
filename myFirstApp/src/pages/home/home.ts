import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic, Thumbnail } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';
import { LoginPage } from '../login/login';
import {Upload_1Page } from '../upload-1/upload-1';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private picArray:Pic[] = [];
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
/*
  getAllFiles(){
    this.mediaProvider.getAllMedia().subscribe((res:Pic[]) =>{
      console.log(res);

      this.picArray = res.map((pic:Pic)=>{
        const nameArray = pic.filename.split(".");
        pic.thumbnails = {
            nameArray[0] + "-tn160.png",
        };
        return pic;
      })

    });
  }
*/




//get thumbnail by requesting single file and push it to picArray
    getAllFiles(){

      this.mediaProvider.getAllMedia().subscribe((res:Pic[])=>{
       // this.picArray = res;

        res.forEach((pic:Pic) =>{
          this.mediaProvider.getSingleMedia(pic.file_id).subscribe((res:Pic) =>{
            this.picArray.push(res);
        });
      });
        console.log(this.picArray);
      })
  }


  /*public logout() {
    this.mediaProvider.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage);
      localStorage.removeItem('token');
      this.mediaProvider.hasLoggedIn = false;
    });
  }
*/

  goToUploadPage() {
    this.navCtrl.push(Upload_1Page);
  }
}
