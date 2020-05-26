import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.page.html',
  styleUrls: ['./gifts.page.scss'],
})
export class GiftsPage implements OnInit {
  received = true;
  sent = false;
  gifts : any;
  selectedGift = "-1";
  selectedUser = "-1";
  // userId = "-1";
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g";
  body = new FormData();
  otherusers = [];
  receivedGifts = [];
  sendTime : any;
  sendDate : any;

  constructor(
    private allService: AllService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.allService.getGifts().subscribe(
      data => {
        if(data['success'] == 1) {
          this.gifts = data['gifts'];
        }
      }
    )
    
    this.storage.get('user').then(userInfo => {
      // this.userId = userInfo.user_id;
      this.body.append('userId', userInfo.user_id);
      this.body.append('user_id', userInfo.user_id);
      this.allService.getUserLocation(this.body).subscribe(
        data => {
          if(data['success'] == 1) {
            this.otherusers = data['users'];
            // console.log('other users--------', data['users']);
          }
        }
      )

      this.allService.receivedGifts(this.body).subscribe(
        data => {
          if(data['success'] == 1) {
            console.log("gift-details=====", data['gift_details']);
            this.receivedGifts = data['gift_details'];
          }
            // console.log("gift-details=====", data['gift_details']);
        }
      )
    })
  }
  

  onReceived() {
    this.received = true;
    this.sent = false;
  }

  onSent() {
    this.received = false;
    this.sent = true;
  }

  sendGift() {
    if(this.selectedGift == "-1") {
      this.allService.presentToast("Select Gift to Send");
      return;
    }
    if(this.selectedUser == "-1") {
      this.allService.presentToast("Select Receiver to Send");
      return;
    }
    if(this.sendDate == undefined) {
      this.allService.presentToast("Select Date to Send");
      return;
    }
    if(this.sendTime == undefined) {
      this.allService.presentToast("Select Time to Send");
      return;
    }
    this.body.append('giftId', this.selectedGift);
    this.body.append('receiverId', this.selectedUser);
    this.body.append('gift_date', this.sendDate.split("T")[0]);
    this.body.append('gift_time', this.sendTime.split("T")[1]);
    this.allService.sendGift(this.body).subscribe(
      data => {
        this.allService.presentToast(data['message']);
        // console.log(data['message']);s
      }
    )
    // console.log(this.sendDate.split("T")[0]);
    // console.log(this.sendTime.split("T")[1]);
  }

  radioChecked(id) {
    this.selectedGift = id;
  }

  radioChecked1(id) {
    // console.log(id);
    this.selectedUser = id;
  }
}
