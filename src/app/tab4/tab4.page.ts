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
  friends = false;
  glimpsters = true;
  countFriend  = 0;
  chatFriends = [];
  isFriend = [];
  otherusers = [];
  body = new FormData();
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "../../assets/imgs/1.png";
  rooms = [];
  currentId = "";

  constructor( 
    private allService : AllService,
    private storage : Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.set('flag', true);
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
          console.log(data);
          data['follwers'].map (
            (item) => {
              console.log(item.friend_id);
              this.isFriend[item.friend_id] = true;
            }
          )
        }
      )
    })
  }

  ionViewWillEnter() {
    console.log("here");
  }

  ionViewWillLeave() {
    this.isFriend.map (
      (key, item) => {
        // console.log(key, " ", item);
        // if(this.isFriend[item] == true) {
          this.body.append('following_id', `${item}`);
          this.allService.addFriends(this.body).subscribe(
            data => {
              console.log(data);
            }
          )
        // }
        // else {

        // }
      }
    )
  }

  onFriends() {
    this.friends = true;
    this.glimpsters = false;
    this.isFriend.map(
      (item, key)=> {
        if(item == true) this.countFriend++;
      }
    )
  }

  onGlimpsters() {
    this.friends = false;
    this.glimpsters = true;
  }

  goChatRoom(chatUser) {
    let navExtra : NavigationExtras = {
      state : {
        userInfo : chatUser,
        currentId : this.currentId,
        flag: false
      }
    }
    this.router.navigate(['/chatroom'], navExtra);
  }

  makeFriend(friendinfo) {
    this.isFriend[friendinfo] = !this.isFriend[friendinfo];

    // let body = new FormData();
    // body.append('user_id', this.currentId);
    // console.log("I am going");
    // console.log(friendinfo);
    // console.log(this.isFriend);
  }

  removeTrash(friendinfo) {
    this.isFriend[friendinfo] = false;
  }

}
