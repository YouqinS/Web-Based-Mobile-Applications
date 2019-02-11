import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic, Thumbnail } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs';
import { UploadPage } from '../upload/upload';
import { PlayerPage } from '../player/player';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private picArray: Pic[] = [];
  public uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  public mediaArray: Observable<Pic[]>;

  constructor(
    public navCtrl: NavController, public http: HttpClient,
    private mediaProvider: MediaProvider) {
  }

  ngOnInit() {
    this.getAllFiles();
  }

//using pipe
  getAllFiles() {
    this.mediaArray = this.mediaProvider.getAllMedia();

    // console.log(this.mediaArray);

  }

  goToUpload() {
    this.navCtrl.push(UploadPage).catch();
  }

//get thumbnail by requesting single file and push it to picArray
  /*  getAllFiles(){

      this.mediaProvider.getAllMedia().subscribe((res:Pic[])=>{
       // this.picArray = res;

        res.forEach((pic:Pic) =>{
          this.mediaProvider.getSingleMedia(pic.file_id).subscribe((res:Pic) =>{
            this.picArray.push(res);
        });
      });
        console.log(this.picArray);
      })
  }*/

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
            // pic.filename.split(".",1) +  "-tn160.png",;
          };
          return pic;
        })

      });
    }
  */

  showPhotoViewer(file_id: number) {
    this.navCtrl.push(PlayerPage,{
      file_id: file_id
    })

  }

/*someFunction(param1, param2) {
    this.navCtrl.push(SomePage, {
      property1: param1,
      property2: param2
    });
  }*/


}
