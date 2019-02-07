
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

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  filedata = '';
  file: File;
  title = '';
  description = '';

  filters = {
    brightness: 100,
    contrast: 100,
    warmth: 0,
    saturation: 100,
  };

  constructor(
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

  handleChange($event) {
    // console.log($event.target.files);
    // get the file from $event
    this.file = $event.target.files[0];
    // call showPreview
    this.showPreview();
  }

  showPreview() {
    // show selected image in img
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      // console.log(reader.result);
      this.filedata = reader.result;
    };

    if (this.file.type.includes('video')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Audio';
    } else {
      reader.readAsDataURL(this.file);
    }

  }

  public uploadMedia(){

    //const description = `[d]${this.description}[/d]`;
    const description = `${this.description}`;
    //const filters = `[f]${JSON.stringify(this.filters)}[/f]`;
    const filters = `${JSON.stringify(this.filters)}`;

    // show spinner
    this.loading.present().catch();
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', description + filters);// + filters
    formData.append('file', this.file);

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
        this.navCtrl.popTo(HomePage);
      }

    });

  }

}

