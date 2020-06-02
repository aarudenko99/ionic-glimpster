import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, AlertController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

import { AllService } from '../all.service';

@Component({
  selector: 'app-postmedia',
  templateUrl: './postmedia.page.html',
  styleUrls: ['./postmedia.page.scss'],
})
export class PostmediaPage implements OnInit {
  userinfo = [];
  newImage = "";
  body = new FormData();
  newEntry : any;
  postText = "";
  placeholderImage = "../../assets/imgs/1.png";
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";

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
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userInfo => {
        console.log(userInfo);
        this.body.append('user_id', userInfo.user_id);
      }
    )
  }

  createPost() {
    // console.log("PPPPPPP");
    if(this.newEntry == undefined) {
      this.presentToast("Please upload image");
      return;
    }
    if(this.postText == "") {
      this.presentToast("Please enter post text");
      return;
    }
    this.startUpload(this.newEntry);
  }

  async uploadImage() {
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

      // this.userinfo['image'] = name;
      // this.storage.set('user', this.userinfo);

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      this.newEntry = {
          name: name,
          path: resPath,
          filePath: filePath
      };
      
      this.ref.detectChanges(); // trigger change detection cycle
      // this.startUpload(newEntry);
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
          this.body.append('image', imgBlob, file.name);
          this.body.append('post_text', this.postText);
          this.allService.imageUpload(this.body).subscribe(
            data => {
              // console.log("Imageuploaded-------", data['message']);
              this.presentToast(data['message']);
              if(data['success'] == 1) {
                this.newImage = data['newImage'];
                // this.userinfo['image'] = data['newImage'] + '.jpg';
                // this.storage.set('user', this.userinfo);
              }
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
    toast.present();
  }

}
