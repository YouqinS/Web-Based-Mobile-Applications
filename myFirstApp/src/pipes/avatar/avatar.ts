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


  transform(file_id: number, ...args) {
    //pure pipe, promise

    return new Promise((resolve, reject) => {
      this.mediaProvider.getAllTagsOfOneFile(file_id).
        subscribe((res: Tag[]) => {
          console.log('getAllTagsOfOneFile', res);

          res.forEach((tag: Tag) => {

            if (tag.tag === 'profile') {
              console.log('tag.file id ?', tag.file_id);
              console.log('tag profile ?', tag.tag);
              //resolve(tag.file_id);
              //return this.tag_file_id;
              this.mediaProvider.getSingleMedia(tag.file_id).subscribe(response=>{
                resolve(response.thumbnails.w160);
               /* switch (args[0]) {
                  case 'large': resolve(response.thumbnails.w640); break;
                  case 'medium': resolve(response.thumbnails.w320); break;
                  case 'small': resolve(response.thumbnails.w160); break;
                  case 'screenshot': resolve(response.screenshot); break;
                  default: resolve(response.thumbnails.w160); break;
                }*/
              })
            }

          });
        })
    });

  }
}
