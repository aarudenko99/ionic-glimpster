import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  body = new FormData();
  postText = "";

  constructor(
    private allService: AllService,
    private storage: Storage,
    private toastController: ToastController,
    private router: Router
  ) {}

  create_post() {
    if(this.postText == "") {
      this.presentToast("Please enter post text");
      return;
    }
    this.storage.get('user').then(userInfo => {
      // console.log(this.postText, userInfo.user_id);
      this.body.append('user_id', userInfo.user_id);
      this.body.append('post_text', this.postText);
      this.allService.createPost(this.body).subscribe(
        data => {
          if(data['success'] == 1) {
            this.presentToast(data['message']);
            this.router.navigate(['/tabs/tab1']).then(() => {
              window.location.reload();
            });
            // console.log(data['message']);
          }
        }
      )
      // this.body.append('user_id', userInfo.user_id);
      // this.body.append('post_text', );
      // this.body.append('ad_type', userInfo['user_info']);
      // this.body.append('ad_value', );
      // this.body.append('latitude', );
      // this.body.append('longitude', );
      // this.body.append('state', );
      // this.body.append('country', );
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
