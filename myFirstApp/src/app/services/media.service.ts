import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()

export class MediaService {

  constructor(public http: HttpClient){}

  private url:string='http://media.mw.metropolia.fi/wbma/media?start=10&limit=5';

  getAllMedia(){

       return this.http.get<Pic[]>(this.url);
      //.subscribe((res:any) =>
       // console.log(res));
     // this.picArray = res);

       //console.log('get all media');

    }


}
