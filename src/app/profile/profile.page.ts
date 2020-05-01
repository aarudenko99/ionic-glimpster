import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  async doLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.storage.clear();
            this.router.navigate(['/landing']);
          }
        }
      ]
    });
    await alert.present();
  }
}
