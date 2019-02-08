
import { Component } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
//import { FileChooser } from '@ionic-native/file-chooser';
//import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Chooser } from '@ionic-native/chooser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  filedata = '';
  title = '';
  description = '';
  public myBlob: Blob;
  public isImage:Boolean = false;
  public hasFile:Boolean = false;

  filters = {
    brightness: 100,
    contrast: 100,
    warmth: 0,
    saturation: 100,
  };

  constructor(
    private camera: Camera,
    private chooser: Chooser,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Upload_1Page');
  }

  loading = this.loadingCtrl.create({
    content: 'Uploading, please wait...',
  });


  showPreview(file) {

    this.myBlob = new Blob(
      [file.data], {
        type: file.mediaType
      });

    const reader = new FileReader();
    reader.addEventListener("loadend", function() {
      // reader.result contains the contents of blob as a typed array
      reader.result;
    });
    reader.readAsArrayBuffer(this.myBlob);
    console.log('myfile: ', this.myBlob);

    if (file.mediaType.includes('video')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Video';
    } else if (file.mediaType.includes('audio')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Audio';
    } else {
      this.filedata = file.dataURI;
     // if(file.mediaType.includes('image')){}
        this.isImage = true;
    }

  }

  public uploadMedia(){

    const description = `[d]${this.description}[/d]`;
    //const description = `${this.description}`;
    const filters = `[f]${JSON.stringify(this.filters)}[/f]`;
    //const filters = `${JSON.stringify(this.filters)}`;

    // show spinner
    this.loading.present().catch();

    const formData = new FormData();
    formData.append('title', this.title);
    console.log('title: ', this.title);

    formData.append('description', description + filters);// + filters
    console.log('description: ', description);

    //formData.append('file', this.file);
    formData.append('file', this.myBlob);

    this.mediaProvider.uploadMedia( formData).subscribe(response => {

      console.log('upload media response', response);

      // setTimeout 2. secs
      setTimeout(() => {
        this.navCtrl.pop().catch();
        // hide spinner
        this.loading.dismiss().catch();
      }, 2000);

      if(response.message ==="file uploaded"){
        // this.navCtrl.pop();
        console.log('file uploaded');
        this.navCtrl.popTo(HomePage);
      }

    });

  }


  public chooseFile(){
    this.chooser.getFile("image/*, video/*, audio/*")
    .then(file => {
      if(file){
        console.log(file ? file.name : 'canceled');
        console.log(file.dataURI);
        console.log(file.mediaType);
        //console.log(file.uri);
        this.hasFile = true;
        this.showPreview(file);

      }else {
        alert("please choose a file to upload");
      }
    })
    .catch((error: any) => console.error(error));

  }



}

