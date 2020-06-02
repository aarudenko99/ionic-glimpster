import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, AlertController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AllService } from '../all.service';

@Component({
  selector: 'app-myprofiles',
  templateUrl: './myprofiles.page.html',
  styleUrls: ['./myprofiles.page.scss'],
})
export class MyprofilesPage implements OnInit {
  body = new FormData();
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "../../assets/imgs/1.png";
  // placeholderImage = "http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g";
  avatar = "";
  bio = [];
  businessProfile = [];

  constructor(
    private storage: Storage,
    private router: Router,
    private allService: AllService,
    private filePath: FilePath,
    private actionSheetController:ActionSheetController,
    private platform: Platform,
    private webview: WebView,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private alertController: AlertController,
    private camera: Camera,
    private file: File
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userinfo => {
        this.body.append('user_id', userinfo.user_id);
        this.avatar = userinfo.image;
        this.allService.getBio(this.body).subscribe(
          data => {
            if(data['success'] == 1) {
              this.bio = data['bio'];
            }
          }
        )

        this.allService.getBusinessProfile(this.body).subscribe(
          data => {
            this.businessProfile = data['business_profile'];
          }
        )
      }
    )
  }

  updateBio() {
    this.body.append('bio_name', this.bio['bio_name']);
    this.body.append('bio_text', this.bio['bio_text']);
    this.allService.updateBio(this.body).subscribe(
      data => {
        this.allService.presentToast(data['message']);
      }
    )
  }

  updateBusiness() {
    this.body.append('business_name', this.businessProfile['business_name']);
    this.body.append('business_email', this.businessProfile['business_email']);
    this.body.append('user_phone', this.businessProfile['user_phone']);
    this.body.append('title', this.businessProfile['title']);
    this.body.append('company_name', this.businessProfile['company_name']);
    this.allService.updateBusiness(this.body).subscribe(
      data => {
        this.allService.presentToast(data['message']);
      }
    )
  }

}
