import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { AllService } from '../all.service';

@Component({
  selector: 'app-myprofiles',
  templateUrl: './myprofiles.page.html',
  styleUrls: ['./myprofiles.page.scss'],
})
export class MyprofilesPage implements OnInit {
  body = new FormData();
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  avatar = "";
  bio = [];
  businessProfile = [];

  constructor(
    private storage: Storage,
    private router: Router,
    private allService: AllService
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userinfo => {
        // console.log(userinfo);
        this.body.append('user_id', userinfo.user_id);
        this.avatar = userinfo.image;
        this.allService.getBio(this.body).subscribe(
          data => {
            // console.log(data);
            if(data['success'] == 1) {
              this.bio = data['bio'];
            }
          }
        )

        this.allService.getBusinessProfile(this.body).subscribe(
          data => {
            console.log(data);
            this.businessProfile = data['business_profile'];
          }
        )
      }
    )
  }

  updateBio() {
    // this.body.append('user_id', );
    this.body.append('bio_name', this.bio['bio_name']);
    this.body.append('bio_text', this.bio['bio_text']);
    this.allService.updateBio(this.body).subscribe(
      data => {
        // console.log(data);
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
