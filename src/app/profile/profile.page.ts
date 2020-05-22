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
  body = new FormData();

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
    this.body.append('user_id', this.userId);
    this.body.append('phone', this.mobileNumber);
    this.body.append('username', this.userName);
    this.allService.updateUserInfo(this.body).subscribe(
      data => {
        if(data['success'] == 1) {
          this.userInfo['user_info'].username = this.userName;
          this.userInfo['user_info'].phone = this.mobileNumber;
          this.storage.set('user', this.userInfo);
          this.allService.presentToast(data['message']);
        }
      }
    )
  }

  verifiedRequest() {
    this.body.append('user_id', this.userId);
    this.allService.verifiedRequest(this.body).subscribe(
      data => {
        this.verifiedAlert(data['message']);
      }
    )
  }

  sponsorRequest() {
    this.body.append('user_id', this.userId);
    this.allService.sponsorRequest(this.body).subscribe(
      data => {
        this.sponsorAlert(data['message']);
      }
    )
  }

  async verifiedAlert(text) {
    const alert = await this.alertController.create({
      header: 'Verify Account',
      message: 'Request to a verified account',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {  
          text: 'Submit',
          handler: () => {
            this.allService.presentToast(text);
          }
        }
      ]
    });
    await alert.present();
  }

  async sponsorAlert(text) {
    const alert = await this.alertController.create({
      header: 'Sponsored Account',
      message: 'Request to a sponsored account',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Submit',
          handler: () => {
            this.allService.presentToast(text);
          }
        }
      ]
    });
    await alert.present();
  }
}
