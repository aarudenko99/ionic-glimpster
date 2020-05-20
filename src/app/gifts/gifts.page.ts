import { Component, OnInit } from '@angular/core';

// import { DatePicker } from '@ionic-native/date-picker/ngx';

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
    // private datePicker: DatePicker
  ) { }

  ngOnInit() {
    this.allService.getGifts().subscribe(
      data => {
        if(data['success'] == 1) {
          this.gifts = data['gifts'];
        }
        // console.log(data);
      }
    )
    // this.datePicker.show({
    //   date: new Date(),
    //   mode: 'date',
    //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    // }).then(
    //   date => console.log('Got date: ', date),
    //   err => console.log('Error occurred while getting date: ', err)
    // );
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
    /* send gift not yet because there is no receiver yet*/
    if(this.selectedGift == "-1") {
      this.allService.presentToast("Select Gift to Send");
      return;
    }
      
  }

  radioChecked(id) {
    this.selectedGift = id;
    // console.log(id);
    // if()
    // if(this.selectedGift == "2")
    //   console.log(this.selectedGift);
  }
}
