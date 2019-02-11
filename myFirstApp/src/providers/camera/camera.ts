import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// @ts-ignore
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera';
// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class CameraProvider {

  constructor(public http: HttpClient, private camera: Camera) {
    console.log('Hello CameraProvider Provider');
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // Do something with the new photo

    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }

}
