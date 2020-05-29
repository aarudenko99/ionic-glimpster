import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  firebaseConfig = {
    apiKey: "AIzaSyC7WWTbC0d7HYwtOYEjuQmq5sNW8pCwweg",
    authDomain: "fir-chat-c375e.firebaseapp.com",
    databaseURL: "https://fir-chat-c375e.firebaseio.com",
    projectId: "fir-chat-c375e",
    storageBucket: "fir-chat-c375e.appspot.com",
    messagingSenderId: "1083338131757",
    appId: "1:1083338131757:web:dad4db6c0c091877e0aba4",
    measurementId: "G-G01NMCD0DT"
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.storage.get('user').then(userInfo => {
        if (userInfo) {
          this.router.navigate(['/tabs']);
        } else {
          this.router.navigate(['/landing']);
        }
      });

      this.splashScreen.hide();
    });
    firebase.initializeApp(this.firebaseConfig);
  }
}
