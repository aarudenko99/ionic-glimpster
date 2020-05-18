import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-allcomment',
  templateUrl: './allcomment.page.html',
  styleUrls: ['./allcomment.page.scss'],
})
export class AllcommentPage implements OnInit {
  postId : any;
  userId : any;
  loginUser = "";
  commentId : any;
  activeComment : any;
  commentInfo = new FormData();
  comments = [];
  placeholderImage = "../../assets/imgs/profile/avatar.png";
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads";

  constructor(
    private allService: AllService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>  {
      this.postId = this.router.getCurrentNavigation().extras.state.postId;
      this.userId = this.router.getCurrentNavigation().extras.state.userId;
      this.commentInfo.append('post_id', this.postId);
      this.commentInfo.append('user_id', this.userId);
      this.allService.getComments(this.commentInfo).subscribe(
        data => {
          if(data['success'] == 1) {
            this.comments = data['comments'];
            this.storage.get('user').then(
              userinfo=> {
                this.loginUser = userinfo.user_id;
                // console.log(userinfo.user_id);
              }
            )
          }
          // else {
          //   this.
          // }
          // console.log(data);
        }
      )
    })
  }

  editComment(id, comment) {
    // console.log(id, " ", comment);
    this.activeComment = comment;
    this.commentId = id;
    this.editCommentAlert();
    // this.allService.updatePostComment(commentInfo).subscribe(
    //   data => {
    //     console.log(data);
    //   }
    // )
  }

  // async editCommentPrompt() {
  //   const alert = await this.alertController.create({
  //     header: '',
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
  
  async editPrompt() {
    let alert = await this.alertController.create({
      header: 'Update Comment',
      inputs: [
        {
          name: 'comment',
          value: this.activeComment
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data1 => {
            // console.log(data.comment);
            let commentInfo = new FormData();
            commentInfo.append('id', this.commentId);
            commentInfo.append('comment', data1.comment);
            this.allService.updatePostComment(commentInfo).subscribe(
              data => {
                this.presentToast(data['message']);
                if(data['success'] == 1) {
                  const ind = this.comments.findIndex(x => x.id === this.commentId)
                  this.comments[ind].comment = data1.comment;
                }
                // console.log(data);
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  async editCommentAlert() {
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
              this.editPrompt();
              // console.log("edit");
              // this.reportAlertPrompt();
              // this.router.navigate(['/report']);
              // this
            }
            else {
              this.commentInfo.append('post_id', this.postId);
              this.commentInfo.append('id', this.commentId);
              this.allService.deleteComment(this.commentInfo).subscribe(
                data1 => {
                  this.presentToast(data1['message']);
                  if(data1['success'] == 1) {
                    // const ind = this.comments.findIndex(x => x.id === this.commentId)
                    const cId = this.commentId;
                    let filtered = this.comments.filter(function(item) {
                      return item.id != cId;
                    })
                    this.comments = filtered;
                    
                    // this.comments[ind].comment = data1.comment;
                  }
                }
              )
              // console.log(this.postId, " ", this.commentId);
            }
          }
        }
      ]
    });

    await alert.present();
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
