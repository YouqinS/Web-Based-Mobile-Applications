import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pic } from '../../interfaces/pic';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { LoginPage } from '../../pages/login/login';
import { observable } from 'rxjs/symbol/observable';

@Injectable()
export class MediaProvider {

  public hasLoggedIn:Boolean = false;
  token: string;
  user:User = null;

  constructor(public http: HttpClient) { }



  getAllMedia(){
   // const url:string = 'http://media.mw.metropolia.fi/wbma/media?start=10&limit=5';
    const url:string = 'http://media.mw.metropolia.fi/wbma/media';

    return this.http.get<Pic[]>(url);
  }


  getSingleMedia(id){
    const mediaURL:string = "http://media.mw.metropolia.fi/wbma/media/"+id;
   // console.log( "medial url : " + mediaURL );
    return  this.http.get<Pic>(mediaURL);

  }



//log in
  public login(user:User){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    const loginPath:string = "http://media.mw.metropolia.fi/wbma/login";
    return this.http.post(loginPath, user, httpOptions);
  }


//register new account
  public register(user:User){
    const registerUrl:string = "http://media.mw.metropolia.fi/wbma/users";
    return  this.http.post(registerUrl, user);
  }


//check if a username exists already
public checkUsername(username){
    const usernameUrl:string = 'http://media.mw.metropolia.fi/wbma/users/username/'+username;
    return this.http.get(usernameUrl, username);
}


  getFilesByTag(tag) {
    // single file
    const tagUrl: string = "http://media.mw.metropolia.fi/wbma/tags/"+tag;
    return this.http.get<Pic[]>(tagUrl);
  }

//check whether a user has logged in/not logged out

  checkToken() {
    const userUrl: string = "http://media.mw.metropolia.fi/wbma/users/user";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<User>(userUrl, httpOptions);
  }





/*public checkToken(){
    return Observable.create(observer=>{
      console.log('checking token');

    if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'undefined'){
      this.hasLoggedIn = true;
    }
      observer.next(this.hasLoggedIn);
      observer.complete();
  })

}*/




  /* getAllMediaOfCurrentUser(user_id){
     const mediaURL:string = "http://media.mw.metropolia.fi/wbma/media/user/"+user_id;
     // console.log( "medial url : " + mediaURL );
     return  this.http.get<Pic[]>(mediaURL);
   }*/

  /*getAllTagsOfOneFile(file_id){
    const tagsUrl:string = 'http://media.mw.metropolia.fi/wbma/tags/file/'+file_id;
    console.log('tagsUrl: ', tagsUrl);
    return this.http.get(tagsUrl);
  }*/

  /* public getCurrentUser(){
        console.log('getting current user info?? ');

        if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'undefined'){
          this.accessToken = localStorage.getItem('token');
        }

        const httpOptions = {
          headers: new HttpHeaders({
            'x-access-token': this.accessToken
          })
        };

        return this.http.get<User>(this.userUrl, httpOptions);

    }*/

}

