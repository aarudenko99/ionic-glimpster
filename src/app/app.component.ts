import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
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
          // this.events.publish('userCheck:created', userInfo);
          this.router.navigate(['/tabs']);
          // this.router.navigate(['/newuserabout']);
        } else {
          // this.events.publish('userCheck:created', 'userNotLogin');
          // this.router.navigate(['/newuserabout']);
          this.router.navigate(['/landing']);
        }
      });

      this.splashScreen.hide();

      this.router.navigate(['/landing']);
    });
  }
}
