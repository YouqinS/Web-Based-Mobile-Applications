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


  constructor(public http: HttpClient) { }



  getAllMedia(){
    const url:string = 'http://media.mw.metropolia.fi/wbma/media?start=10&limit=5';
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

//check whether a user has logged in/not logged out
public checkToken(){
    return Observable.create(observer=>{
      console.log('checking token');

    if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'undefined'){
      this.hasLoggedIn = true;
    }
      observer.next(this.hasLoggedIn);
      observer.complete();
  })

}







}

