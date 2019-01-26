import { HttpClient } from '@angular/common/http';
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


public checkToken(){
    return Observable.create(observer => {
      this.token = localStorage.getItem('token');
      observer.next(this.token);
      observer.complete();
    });
}


  public userLogin(user:User){
    const loginPath:string = "http://media.mw.metropolia.fi/wbma/login";
    const httpOptions = {};
    return this.http.post(loginPath, user);
  }



//login
  access: boolean;
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
  }





        /*// Store
localStorage.setItem("lastname", "Smith");

// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");
*/

  /*public login(credentials) {
    const loginPath:string = "http://media.mw.metropolia.fi/wbma/login/";

    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please enter credentials.");
    } else {

      return Observable.create(observer => {

        this.http.post(loginPath, credentials)
        .map(res => res.json())
        .subscribe( data => {
          if (data.access_token) {
            this.token = 'Bearer ' + data.access_token;
            this.access = true;
          } else {
            this.access = false;
          }
        });


}

      setTimeout(() => {
        observer.next(this.access);
      }, 500);

      setTimeout(() => {
        observer.complete();
      }, 1000);


    }, err => console.error(err));*/


  // Register
  public register(credentials) {

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

  }




  // Logout
  /*public  logout() {
    return Observable.create(observer => {
      localStorage.removeItem('token');
      console.log('logout token ' + localStorage.getItem('token'));
      this.token = localStorage.getItem('token');
      this.hasLoggedIn = false;

      observer.next(true);
      observer.complete();
    });
  }*/

/*
  public logout(){
    localStorage.removeItem('token');
    console.log('logout token ' + this.token);
    this.hasLoggedIn = false;
  }*/


}

