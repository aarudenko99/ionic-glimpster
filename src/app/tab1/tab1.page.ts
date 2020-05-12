import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AllService } from '../all.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading: any;
  imageBaseUrl = "";
  placeholderImage = "../../assets/imgs/profile/avatar.png";
  // comingImage = "";
  body = new FormData();
  posts = [];



  constructor(
    private allService: AllService,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // this.showLoader();
    this.storage.get('user').then(userInfo => {
      this.imageBaseUrl = this.allService.getImageBaseUrl();
      // console.log(userInfo.user_id, userInfo['user_info']['lat'], userInfo['user_info']['lng']);
      this.body.append('user_id', userInfo.user_id);
      this.body.append('latitude', userInfo['user_info']['lat']);
      this.body.append('longitude', userInfo['user_info']['lng']);
      this.allService.getPosts(this.body).subscribe (
        data => {
          if(data['success'] == 1) {
            this.posts = data['posts'];
            console.log( this.posts);
          }
          // user_image
          // created_at 
          // likes
          // media
          // post_thumb
          // comments
          // share

        }
      )
    })
    // user_id
    // latitude
    // longitude
    // this.allService.getAllContest().subscribe(
    //   data => {
    //     if(data['success'] == 1) {
    //       this.imageBaseUrl = this.allService.getImageBaseUrl();
    //       this.upcomingContest = data['upcoming_contest']
    //       this.pastContest = data['passed_contest'];
    //       // this.navigationExtras = {
    //       //   state: {
    //       //     upcomingContest: this.upcomingContest,
    //       //     pastContest: this.pastContest,
    //       //     imageBaseUrl: this.imageBaseUrl
    //       //   }
    //       // };
    //       // this.dismissLoading();
    //     }
    //     else {
    //       this.presentToast("Error");
    //       // this.dismissLoading();
    //     }
        
    //   },

    //   err => {
    //     console.log(err);
    //     this.presentToast("Network error");
    //     // this.dismissLoading();
    //   }
    // )
  }

  // viewAll() {
  //   console.log(this.navigationExtras);
  //   this.router.navigate(['/all-contests']);
  // }

  // detailContest(detailContest) {
  //   this.navigationExtras = {
  //     state: {
  //       detailContest: detailContest,
  //       imageBaseUrl: this.imageBaseUrl
  //     }
  //   }
  //   this.router.navigate(['/detailcontest'], this.navigationExtras);
  // }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({
      message: 'please wait',
      backdropDismiss: true,
    });
    
    this.loading.present();
    await this.loading.onDidDismiss();
  }

  async dismissLoading() {
    await this.loading.dismiss();
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
