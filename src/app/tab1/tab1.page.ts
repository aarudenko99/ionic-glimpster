import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { LoadingController, ToastController, AlertController } from '@ionic/angular';
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
  body = new FormData();
  posts = [];
  currentUser : number;
  activeUserId: number;
  activePostId: number;

  constructor(
    private allService: AllService,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    
    // this.showLoader();
    this.storage.get('user').then(userInfo => {
      this.imageBaseUrl = this.allService.getImageBaseUrl();
      this.currentUser = userInfo.user_id;
      this.body.append('user_id', userInfo.user_id);
      this.body.append('latitude', userInfo['user_info']['lat']);
      this.body.append('longitude', userInfo['user_info']['lng']);
      this.allService.getPosts(this.body).subscribe (
        data => {
          if(data['success'] == 1) {
            this.posts = data['posts'];
          }
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

  viewMore(userId, postId) {
    this.activePostId = postId;
    this.activeUserId = userId;
    if(userId == this.currentUser) {
      this.loginAlert();
    }
    else {
      this.normalAlert();
    }
  }

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

  // async presentAlertPrompt() {
  //   const alert = await this.alertController.create({
  //     header: 'Prompt!',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Ok',
  //         handler: () => {
  //           console.log('Confirm Ok');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  async reportAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: () => {
            let reportInfo = new FormData();
            reportInfo.append('user_id', this.activeUserId+"");
            reportInfo.append('post_id', this.activePostId+"");
            this.allService.deletePost(reportInfo).subscribe(
              data => {
                if(data['success'] == 1) {
                  this.router.navigate(['/report']);
                }
                else {
                  this.presentToast(data['message']);
                }
              }
            )
          }
        }
      ]
    });

    await alert.present();
  }

  async deletePrompt() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          handler: () => {
            let deleteInfo = new FormData();
            deleteInfo.append('user_id', this.activeUserId+"");
            deleteInfo.append('post_id', this.activePostId+"");
            this.allService.deletePost(deleteInfo).subscribe(
              data => {
                if(data['success'] == 1) {
                  this.presentToast('Post deleted successfully');
                }
                else {
                  this.presentToast('There is an error while deleting');
                }
              }
            )
          }
        }
      ]
    });

    await alert.present();
  }

  async loginAlert() {
    const alert = await this.alertController.create({
      header: '',
      inputs: [
        {
          name: 'Edit',
          type: 'radio',
          label: 'Edit',
          value: 'edit',
          checked: true
        },
        {
          name: 'Delete',
          type: 'radio',
          label: 'Delete',
          value: 'delete'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (data) => {
            if(data == 'edit') {
              this.router.navigate(['/editpost']);
            }
            else {
              // this.router.navigate['/login'];
              this.deletePrompt();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async normalAlert() {
    const alert = await this.alertController.create({
      header: '',
      inputs: [
        {
          name: 'Report',
          type: 'radio',
          label: 'Report',
          value: 'report',
          checked: true
        },
        {
          name: 'Share',
          type: 'radio',
          label: 'Share',
          value: 'share'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (data) => {
            if(data == 'report') {
              this.reportAlertPrompt();
              // this.router.navigate(['/report']);
              this
            }
            else {

            }
          }
        }
      ]
    });

    await alert.present();
  }

}
