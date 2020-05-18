import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, AlertController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { AllService } from '../all.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  userinfo = [];
  placeholderImage = "http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g";
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  images = [];
  postsCount = 0;
  followers = 0;
  following = 0;
  myPosts = [];

  constructor(
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    private storage: Storage,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private webview: WebView,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private allService: AllService,
    private router: Router,
    private alertController: AlertController
    // private navigationExtras: NavigationExtras
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userInfo => {
        this.userinfo = userInfo;
        console.log(userInfo['user_info'].username);
        let body = new FormData();
        body.append('user_id', userInfo['user_id']);
        this.allService.getMyPosts(body).subscribe(
          data => {
            // console.log(data);
            if(data['success'] == 1) {
              this.postsCount = data['posts'].length;
              console.log(data['posts']);
              this.myPosts = data['posts'];
              // this.router.navigate(['/mypost']);
            }
          }
        )

        this.allService.getFollowers(body).subscribe(
          data => {
            if(data['success'] == 1) {
              this.followers = data['follwers'].length;
            }
          }
        )

        this.allService.getFollowing(body).subscribe(
          data => {
            if(data['success'] == 1) {
              this.following = data['follwers'].length;
              // console.log(data);
            }
          }
        )
      }
    )
  }

  getMyPosts() {
    let navigationExtras: NavigationExtras = {
      state: {
        userName: this.userinfo['user_info'].username,
        myPosts: this.myPosts
      }
    }

    this.router.navigate(['/mypost'], navigationExtras);
  }

  async pointAlert() {
    const alert = await this.alertController.create({
      header: '',
      inputs: [
        {
          name: 'Select Points Type',
          type: 'radio',
          label: 'Select Points Type',
          value: '1',
          checked: true
        },
        {
          name: 'Watch Ads',
          type: 'radio',
          label: 'Watch Ads',
          value: '2'
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
            if(data == '1') {
              console.log("1");
            }
            else {
              // this.router.navigate(['/businesscard']);
              console.log("2");
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async updateAvatar() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }
 
  takePicture(sourceType: PictureSourceType) {
      var options: CameraOptions = {
          quality: 100,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true
      };
  
      this.camera.getPicture(options).then(imagePath => {
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(imagePath)
                  .then(filePath => {
                      let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                      let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                  });
          } else {
              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
      });
  
  }
  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
  }
  
  copyFileToLocalDir(namePath, currentName, newFileName) {
      this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
          this.updateStoredImages(newFileName);
      }, error => {
          this.presentToast('Error while storing file.');
      });
  }
  

  updateStoredImages(name) {
    // this.storage.set();
    // this.storage.get('user').then(
    //   userinfo => {

    //   }
    // );
    let filePath = this.file.dataDirectory + name;
    let resPath = this.pathForImage(filePath);

    let newEntry = {
      name: name,
      path: resPath,
      filePath: filePath
    };

    this.images = [newEntry, ...this.images];
    // this.UploadImage(this.user);
    // console.log(this.images);
    this.ref.detectChanges(); // trigger change detection cycle
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  // UploadImage(user) {
  //   // this.allService.showLoader('uploading...')
  //   if (this.images.length > 0) {

  //     // let _mime_type = 'image/jpeg'

  //     // let smext = this.images[0].name.split('.').pop();
  //     // let ext = smext.toLowerCase();

  //     // if (ext == 'png') {
  //     //   _mime_type = 'image/png';
  //     // }

  //     // if (ext == 'jpeg') {
  //     //   _mime_type = 'image/jpeg';
  //     // }

  //     // if (ext == 'mov') {
  //     //   _mime_type = 'video/quicktime';
  //     // }

  //     // if (ext == 'mp4') {
  //     //   _mime_type = 'video/mp4';
  //     // }

  //     // if (ext == 'jpg') {
  //     //   _mime_type = 'image/jpeg';
  //     // }

  //     const fileTransfer: FileTransferObject = this.transfer.create();
  //     let header: Headers = new Headers();
  //     header.append('Authorization', 'Bearer ' + user.token);
  //     let options: FileUploadOptions = {
  //       fileKey: 'file',
  //       fileName: user.user_id + '_featured.' + ext,
  //       chunkedMode: false,
  //       mimeType: _mime_type,
  //       params: { 'type':this.type, 'user': user.user_id, 'ext': ext },
  //       headers: { 'Authorization': 'Bearer ' + user.token }
  //     }


  //     let url = this.allService.getURL();
  //     fileTransfer.upload(this.images[0].filePath, url + '/wp-json/wp/v2/media?token=' + user.token, options)
  //       .then((data1) => {
  //         console.log(data1)
  //         this.allService.dismissLoading();
  //         if(this.type=="trainerGallery"){
  //          this. GetUserProfileImages(user.token);
  //         }else{
  //           this.GetUserImage();
  //         }
           
  //         this.images = [];
  //       }, (err) => {
  //         console.log(err);
  //         this.allService.dismissLoading();
  //       });
  //   }
  // }
 
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
  }


}
