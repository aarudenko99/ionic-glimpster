import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  friends = true;
  glimpsters = false;
  otherusers = [];
  body = new FormData();
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g";

  constructor( 
    private allService : AllService,
    private storage : Storage,
  ) { }

  ngOnInit() {
    this.storage.get('user').then(userInfo => {
      this.body.append('user_id', userInfo.user_id);
      this.allService.getUserLocation(this.body).subscribe(
        data => {
          if(data['success'] == 1) {
            this.otherusers = data['users'];
            // console.log('other users--------', data['users']);
          }
        }
      )
    })
  }

  onFriends() {
    this.friends = true;
    this.glimpsters = false;
  }

  onGlimpsters() {
    this.friends = false;
    this.glimpsters = true;
  }

}
