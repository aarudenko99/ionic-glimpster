import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  body = new FormData();
  userLocations = [];
  imageBaseUrl = "";
  lng = 0;
  lat = 0;
  placeholderImage = "../../assets/imgs/logo.png";

  loading: any;

  constructor(
    private allService: AllService,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
    this.storage.get('user').then(userInfo => {
      this.allService.showLoader();

      this.lng = userInfo.user_info['lng'];
      this.lat = userInfo.user_info['lat'];
      this.body.append('user_id', userInfo.user_id);
      this.allService.getUserLocation(this.body).subscribe(
        data => {
          if(data['success'] == 1) {
            this.userLocations = data['users'];
            this.imageBaseUrl = this.allService.getImageBaseUrl();
            this.allService.dismissLoading();
          }
          else {
            this.allService.presentToast(data['message']);
            this.allService.dismissLoading();
          }
        }
      )
    })
  }

  distanceBetween(locationInfo) {
    // return "123";
    // console.log(this.lng);
    let theta = this.lng - locationInfo.lng;
    let dist = Math.sin(this.deg2rad(locationInfo.lat)) * Math.sin(this.deg2rad(this.lat))
      + Math.cos(this.deg2rad(locationInfo.lat)) * Math.cos(this.deg2rad(this.lat)) * Math.cos(this.deg2rad(theta));
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1000;
    return parseInt(dist * 3.28084 + "") + " Feet";
  }

  deg2rad(deg) {
    return (deg * Math.PI / 180.0);
  }

}

// double theta = lon1 - lon2;
//         double dist = Math.sin(deg2rad(lat1))
//                 * Math.sin(deg2rad(lat2))
//                 + Math.cos(deg2rad(lat1))
//                 * Math.cos(deg2rad(lat2))
//                 * Math.cos(deg2rad(theta));
//         dist = Math.acos(dist);
//         dist = dist * 180.0 / Math.PI;
//         dist = dist * 60 * 1.1515 * 1000;
//         return (dist);
