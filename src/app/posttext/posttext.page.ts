import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-posttext',
  templateUrl: './posttext.page.html',
  styleUrls: ['./posttext.page.scss'],
})
export class PosttextPage implements OnInit {
  body = new FormData();
  postText = "";

  constructor(
    private allService: AllService,
    private storage: Storage,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  create_post() {
    if(this.postText == "") {
      this.presentToast("Please enter post text");
      return;
    }
    this.storage.get('user').then(userInfo => {
      this.body.append('user_id', userInfo.user_id);
      this.body.append('post_text', this.postText);
      this.allService.createPost(this.body).subscribe(
        data => {
          if(data['success'] == 1) {
            this.presentToast(data['message']);
            this.router.navigate(['/tabs/tab1']).then(() => {
              window.location.reload();
            });
          }
        }
      )
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
