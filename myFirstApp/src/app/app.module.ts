import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {
  IonicApp,
  IonicErrorHandler,
  IonicModule,
  NavController,
} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { MediaProvider } from '../providers/media/media';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { PipesModule } from '../pipes/pipes.module';
import { UploadPage } from '../pages/upload/upload';
// @ts-ignore
//import { Camera } from '@ionic-native/camera';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Chooser } from '@ionic-native/chooser';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    LoginPage,
    ProfilePage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProfilePage,
    LoginPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    HttpClientModule,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    Camera,
    Chooser,

  ]
})
export class AppModule {}
