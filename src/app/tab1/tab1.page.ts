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
  comment = "";
  imageBaseUrl = "";
  placeholderImage = "../../assets/imgs/profile/avatar.png";
  body = new FormData();
  posts = [];
  likesFlag = false;
  currentLikes = 0;
  likesClass = 'heart';
  currentUser : number;
  lat : any;
  lng : any;
  activeUserId: number;
  activePostId: number;
  activePostText = "";
  avatarImage = "";

  constructor(
    private allService: AllService,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    // this.allService.showLoader();
    this.storage.get('user').then(userInfo => {
      this.imageBaseUrl = this.allService.getImageBaseUrl();
      this.currentUser = userInfo.user_id;
      this.avatarImage = userInfo.image;
      this.lat = userInfo['user_info']['lat'];
      this.lng = userInfo['user_info']['lng'];
      this.body.append('user_id', userInfo.user_id);
      this.body.append('latitude', userInfo['user_info']['lat']);
      this.body.append('longitude', userInfo['user_info']['lng']);
      this.allService.getPosts(this.body).subscribe (
        data => {
          if(data['success'] == 1) {
            this.posts = data['posts'];
            // this.allService.dismissLoading();
          }
        }
      )
    })
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

  changeLikes(postId) {
    if(this.likesFlag == false) this.currentLikes++;
    else this.currentLikes--;
    let likesInfo = new FormData();
    likesInfo.append('post_id', postId);
    likesInfo.append('user_id', `${this.currentUser}`);
    this.allService.likePost(likesInfo).subscribe(
      data => {
        if (data['success'] == 1) {
          const ind = this.posts.findIndex(x => x.id === postId)
          this.posts[ind].likes = `${Number(this.posts[ind].likes) + data['status']}`;
        }
      }
    )
    this.likesFlag = !this.likesFlag;
  }

  addComment(postId) {
    console.log((<HTMLInputElement>document.getElementById("comment" + postId)).value);
    let commentInfo = new FormData();
    commentInfo.append('post_id', postId);
    commentInfo.append('user_id', `${this.currentUser}`);
    commentInfo.append('comment', (<HTMLInputElement>document.getElementById("comment" + postId)).value);

    (<HTMLInputElement>document.getElementById("comment" + postId)).value = "";
    
    this.allService.addPostComment(commentInfo).subscribe(
      data => {
        if(data['success'] == 1) {
          const ind = this.posts.findIndex(x => x.id === postId)
          this.posts[ind].comments = `${Number(this.posts[ind].comments) + 1}`;
        }
      }
    )
  }

  editComment(userId, postId) {
    let navigationExtras: NavigationExtras = {
      state: {
        userId: userId,
        postId: postId
      }
    }
    this.router.navigate(['/allcomment'], navigationExtras);
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
            reportInfo.append('user_id', `${this.activeUserId}`);
            reportInfo.append('post_id', `${this.activePostId}`);
            this.allService.deletePost(reportInfo).subscribe(
              data => {
                if(data['success'] == 1) {
                  this.router.navigate(['/report']);
                }
                else {
                  this.presentToast(data['message']);
                }
              },
              err => {

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
            deleteInfo.append('user_id', `${this.activeUserId}`);
            deleteInfo.append('post_id', `${this.activePostId}`);
            let cId = this.activePostId
            let filtered = this.posts.filter(function(item) {
              return item.id != cId
            })
            console.log(filtered);
            this.posts = filtered;
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

              const ind = this.posts.findIndex(x => x.id === this.activePostId)
              console.log(this.posts[ind]);
    
              let navigationExtras: NavigationExtras = {
                state: {
                  editPost: this.posts[ind],
                  imageBaseUrl: this.imageBaseUrl
                }
              }
              this.router.navigate(['/editpost'], navigationExtras);
            }
            else {
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
