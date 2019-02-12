import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MediaProvider } from '../../providers/media/media';
import { MyFilesPage } from '../my-files/my-files';

@IonicPage()
@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider) {
    this.file_id = this.navParams.get('file_id');
  }

  title = '';
  description = '';
  data: {};
  file_id;
  @ViewChild('uploadForm') uploadForm: any;

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ModifyPage');
  }


  modifyFileInfo(){

    const description = `[d]${this.description}[/d]`;

    console.log('title: ', this.title);
    console.log('description: ', description);
    console.log('file_id: ', this.file_id);

    this.data ={
      "title": this.title,
      "description": description
    };

    this.mediaProvider.modifyFile(this.file_id, this.data).subscribe(response => {

      console.log('upload media response', response);

      if(response.message ==="File info updated"){
        // this.navCtrl.pop();
        console.log('File info updated');
        alert('File info updated');
        //this.navCtrl.popTo(MyFilesPage);
        this.navCtrl.push(MyFilesPage);
      }

    });

  }

  cancelModify() {
    console.log('reset form');
    this.uploadForm.reset();
  }
}
