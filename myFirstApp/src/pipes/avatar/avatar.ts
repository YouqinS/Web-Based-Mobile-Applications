import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic, Tag } from '../../interfaces/pic';

/**
 * Generated class for the AvatarPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'avatar',
})
export class AvatarPipe implements PipeTransform {

  constructor(private mediaProvider: MediaProvider) {
  }


  async transform(file_id_promise: Promise<number>, ...args) {

    return file_id_promise.then(file_id =>{
      return new Promise((resolve, reject) => {
        this.mediaProvider.getSingleMedia(file_id).subscribe((response) =>{
          console.log('get Single Media Res', response);

          switch (args[0]) {
            case 'large': resolve(response.thumbnails.w640); break;
            case 'medium': resolve(response.thumbnails.w320); break;
            case 'small': resolve(response.thumbnails.w160); break;
            case 'screenshot': resolve(response.screenshot); break;
            default: resolve(response.thumbnails.w160); break;
          }
        })

      })
    })


  }
}
