import { Component, OnInit } from '@angular/core';

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
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";

  constructor(
    private allService: AllService,
  ) { }

  ngOnInit() {
    this.allService.getGifts().subscribe(
      data => {
        if(data['success'] == 1) {
          this.gifts = data['gifts'];
        }
      }
    )
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
      
  }

  radioChecked(id) {
    this.selectedGift = id;
  }
}
