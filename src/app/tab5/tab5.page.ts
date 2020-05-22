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

  body = new FormData();

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
        this.body.append('user_id', userInfo['user_id']);
        this.allService.getMyPosts(this.body).subscribe(
          data => {
            if(data['success'] == 1) {
              this.postsCount = data['posts'].length;
              this.myPosts = data['posts'];
            }
          }
        )

        this.allService.getFollowers(this.body).subscribe(
          data => {
            if(data['success'] == 1) {
              this.followers = data['follwers'].length;
            }
          }
        )

        this.allService.getFollowing(this.body).subscribe(
          data => {
            if(data['success'] == 1) {
              this.following = data['follwers'].length;
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
            }
            else {
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

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
          name: name,
          path: resPath,
          filePath: filePath
      };
      
      this.ref.detectChanges(); // trigger change detection cycle
      this.startUpload(newEntry);
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  startUpload(imgEntry) {
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
        })
        .catch(err => {
            this.presentToast('Error while reading file.');
        });
  }
 
  readFile(file: any) {
      const reader = new FileReader();
      reader.onload = () => {
          const formData = new FormData();
          const imgBlob = new Blob([reader.result], {
              type: file.type
          });
          formData.append('file', imgBlob, file.name);
          this.body.append('userfile', imgBlob);
          this.allService.updateUserImage(this.body).subscribe(
            data => {
            }
            
          )
      };
      reader.readAsArrayBuffer(file);
  }
 
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
  }


}
