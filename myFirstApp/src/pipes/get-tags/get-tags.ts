import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic, Tag } from '../../interfaces/pic';
import { ProfilePage } from '../../pages/profile/profile';

@Pipe({
  name: 'getTags',
})

export class GetTagsPipe implements PipeTransform {
  constructor(public mediaProvider: MediaProvider, public profilePage:ProfilePage) {

  }

  async transform(tag: string) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getFilesByTag(tag).subscribe((files: Pic[]) => {
        console.log('getFilesByTag res: ', files);

         let profileFound:Boolean = false;
        files.forEach((file: Pic) => {
          if (file.user_id === this.mediaProvider.user.user_id) {
            profileFound = true;
            console.log('profile found: ' + file.user_id + '/' + this.mediaProvider.user.user_id);
            resolve(file.file_id);
          }
          else {
            console.log("profile not found: " + file.user_id + '/' + this.mediaProvider.user.user_id);
            //reject('No profile image added.');
          }
        });
        if(!profileFound){
          reject('No profile image added.');
        }

      });
    });
  }
}






/*export class GetTagsPipe implements PipeTransform {

  constructor(private mediaProvider: MediaProvider) {}


  async transform(file_id: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getAllTagsOfOneFile(file_id).
        subscribe((res: Tag[]) => {
          console.log('getAllTagsOfOneFile', res);

          res.forEach((tag: Tag) => {

            if (tag.tag === 'profile') {
              console.log('tag.file id ?', tag.file_id);
              console.log('tag profile ?', tag.tag);
              resolve(tag.file_id);

            }

          });
        })
    });

  }


}*/
