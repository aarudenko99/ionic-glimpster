import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Storage } from '@ionic/storage';
// import * as firebase from 'Firebase';

import { AllService } from '../all.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  friends = true;
  glimpsters = false;
  chatFriends = [];
  otherusers = [];
  body = new FormData();
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g";
  rooms = [];
  currentId = "";

  constructor( 
    private allService : AllService,
    private storage : Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.get('user').then(userInfo => {
      this.body.append('user_id', userInfo.user_id);
      this.currentId = userInfo.user_id;
      this.allService.getUserLocation(this.body).subscribe(
        data => {
          if(data['success'] == 1) {
            this.otherusers = data['users'];
          }
        }
      )

      this.allService.getChatFriends(this.body).subscribe(
        data => {
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

  goChatRoom(chatUser) {
    let navExtra : NavigationExtras = {
      state : {
        userInfo : chatUser,
        currentId : this.currentId
      }
    }
    this.router.navigate(['/chatroom'], navExtra);
  }

}
