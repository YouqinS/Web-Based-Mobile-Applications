import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
  //pure: false //impure pipe
})
export class ThumbnailPipe implements PipeTransform {

  constructor(private mediaProvider:MediaProvider){}

  private thumbnail;
  private cachedId;

  async transform(file_id: number, ...args) {

    //console.log('...args', args[0]);

   /* impure pipe
    if(this.cachedId !== file_id){
      this.cachedId = file_id;
      this.mediaProvider.getSingleMedia(file_id).subscribe((response) =>{
        console.log('getSingleMedia Res', response);

        switch (args[0]) {
          case 'large': this.thumbnail = response.thumbnails.w640; break;
          case 'medium': this.thumbnail = response.thumbnails.w320; break;
          case 'small': this.thumbnail = response.thumbnails.w160; break;
          case 'screenshot': this.thumbnail = response.screenshot; break;
          default: this.thumbnail = response.thumbnails.w160;

        }
        console.log('thumbnail: ' + this.thumbnail);
      });
    }
    // return this.thumbnail;
    */

   //pure pipe, promise
    return new Promise((resolve, reject) => {
      this.mediaProvider.getSingleMedia(file_id).subscribe((response) =>{
        console.log('getSingleMedia Res', response);

        switch (args[0]) {
          case 'large': resolve(response.thumbnails.w640); break;
          case 'medium': resolve(response.thumbnails.w320); break;
          case 'small': resolve(response.thumbnails.w160); break;
          case 'screenshot': resolve(response.screenshot); break;
          default: resolve(response.thumbnails.w160); break;
        }
       // console.log('thumbnail: ' + this.thumbnail);
      })

    })


  }
}
