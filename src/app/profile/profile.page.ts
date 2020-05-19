import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName = "ddd";
  mobileNumber = "";
  userId = "";
  userInfo = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private allService: AllService
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userinfo => {
        this.userInfo = userinfo;
        this.userId = userinfo.user_id;
        this.userName = userinfo['user_info'].username;
        this.mobileNumber = userinfo['user_info'].phone;
        // console.log(userinfo);
      }
    )
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

  updateProfile() {
    let body = new FormData();
    body.append('user_id', this.userId);
    body.append('phone', this.mobileNumber);
    body.append('username', this.userName);
    this.allService.updateUserInfo(body).subscribe(
      data => {
        if(data['success'] == 1) {
          // console.log(data['message']);
          this.userInfo['user_info'].username = this.userName;
          this.userInfo['user_info'].phone = this.mobileNumber;
          this.storage.set('user', this.userInfo);
          this.allService.presentToast(data['message']);
        }
      }
    )
  }
}
