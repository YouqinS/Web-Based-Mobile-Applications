import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pic } from '../../interfaces/pic';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { LoginPage } from '../../pages/login/login';

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
    console.log( "medial url : " + mediaURL );
    return  this.http.get<Pic>(mediaURL);

  }



  public login(user:User){
    console.log('????????');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    const loginPath:string = "http://media.mw.metropolia.fi/wbma/login";
    return this.http.post(loginPath, user, httpOptions);
  }



  public register(user:User){
    const registerUrl:string = "http://media.mw.metropolia.fi/wbma/users";
    return  this.http.post(registerUrl, user);
  }


public checkUsername(username){
    const usernameUrl:string = 'http://media.mw.metropolia.fi/wbma/users/username/'+username;
    return this.http.get(usernameUrl, username);
}




//login
 /* access: boolean;
  public login(credentials) {
    const loginPath:string = "http://media.mw.metropolia.fi/wbma/login";

      return Observable.create(observer => {

        this.http.post(loginPath, credentials).subscribe(data => {

            if (data.hasOwnProperty('token') && this.token !== 'undefined') {
              this.token = data['token'];
              console.log('token: ' + this.token);
              console.log('message: ' + data['message']);
             // alert(data['message']);
                localStorage.setItem("token", this.token);
                this.access = true;
            } else {
              this.access = false;
            }
          observer.next(this.access);
          observer.complete();
        });

      })
  }*/


  // Register
  /*public register(credentials) {

    const registerUrl:string = "http://media.mw.metropolia.fi/wbma/users";

      return Observable.create(observer => {

        this.http.post(registerUrl, credentials).subscribe( data => {

          console.log(data);

          if (data.hasOwnProperty('user_id')) {
            console.log('user_id: ' + data['user_id']);
            console.log('message: ' + data['message']);
            // alert(data['message']);
            this.access = true;
          } else {
            this.access = false;
          }
          observer.next(this.access);
          observer.complete();
        });

      });

  }*/





}

