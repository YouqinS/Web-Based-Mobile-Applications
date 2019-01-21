import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pic } from '../../interfaces/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  constructor(public http: HttpClient) { }



  getAllMedia(){
    const url:string = 'http://media.mw.metropolia.fi/wbma/media?start=10&limit=5';
    return this.http.get<Pic[]>(url);
  }


  getSingleMedia(id){
    const mediaURL:string = "http://media.mw.metropolia.fi/wbma/media/"+id;
    console.log( "medial url : " + mediaURL );
    return  this.http.get<Pic>(mediaURL);

  }


}

