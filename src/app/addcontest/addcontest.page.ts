import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { AllService } from '../all.service';

@Component({
  selector: 'app-addcontest',
  templateUrl: './addcontest.page.html',
  styleUrls: ['./addcontest.page.scss'],
})
export class AddcontestPage implements OnInit {
  userId = "";
  body = new FormData();
  title = "";
  startDate = "";
  endDate = "";
  startTime = "";
  endTime = "";
  points = "0";
  views = "0";
  amount = "0";
  contestType = "free";
  newEntry = {};

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
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userinfo => {
        this.userId = userinfo.user_id;
        this.body.append('user_id', this.userId);
        console.log(this.userId);
      }
    )
  }

  addContest() {
    // console.log(this.contestType);
    
    if(this.title == "") {
      this.allService.presentToast("Please write the contest title.");
      return;
    }
    if(this.startDate == "") {
      this.allService.presentToast("Please select Start Date.");
      return;
    }
    if(this.startTime == "") {
      this.allService.presentToast("Please select Start Time.");
      return;
    }
    if(this.endDate == "") {
      this.allService.presentToast("Please select End Date.");
      return;
    }
    if(this.endTime == "") {
      this.allService.presentToast("Please select End Time.");
      return;
    }

    this.body.append('title', this.title);
    this.body.append('start_date', this.startDate.split("T")[0]);
    this.body.append('start_time', this.startTime.split("T")[1]);
    this.body.append('end_date', this.endDate.split("T")[0]);
    this.body.append('end_time', this.endTime.split("T")[1]);
    this.body.append('points', this.points);
    this.body.append('views', this.views);
    this.body.append('amount', this.amount);
    this.body.append('isPointBased', "false");
    this.body.append('isAdsBased', "false");
    this.body.append('contestType', this.contestType);

    console.log(this.title, " ", this.startDate, " ", this.startTime, " ", this.points, " ", this.views, " ", this.amount, " ", this.contestType);
    this.startUpload(this.newEntry);
  }

  async selectImage() {
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
          this.allService.presentToast('Error while storing file.');
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
      this.allService.presentToast("Image selected");
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
            this.allService.presentToast('Error while reading file.');
        });
  }
 
  readFile(file: any) {
      const reader = new FileReader();
      reader.onload = () => {
          const formData = new FormData();
          const imgBlob = new Blob([reader.result], {
              type: file.type
          });
          this.body.append('userfile', imgBlob, file.name);
          // this.body.append('post_text', this.postText);
          // this.allService.presentToast('Here I am');
          this.allService.createContest(this.body).subscribe(
            data => {
              // console.log("Imageuploaded-------", data['message']);
              // this.allService.presentToast('Here I am');
              this.allService.presentToast(data['message']);
              this.router.navigate(['/mycontests']);
              // if(data['success'] == 1) {
              //   this.newImage = data['newImage'];
              //   // this.userinfo['image'] = data['newImage'] + '.jpg';
              //   // this.storage.set('user', this.userinfo);
              // }
            },
            error => {
              this.allService.presentToast('Here I am error');
            }
            
          )
      };
      reader.readAsArrayBuffer(file);
  }

}
