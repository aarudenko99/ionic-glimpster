import { Component } from '@angular/core';
import { } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  body = new FormData();

  constructor(
    private allService: AllService,
    private storage: Storage
  ) {}

  create_post() {
    this.storage.get('user').then(userInfo => {
      console.log(userInfo);
      // this.body.append('user_id', userInfo.user_id);
      // this.body.append('post_text', );
      // this.body.append('ad_type', userInfo['user_info']);
      // this.body.append('ad_value', );
      // this.body.append('latitude', );
      // this.body.append('longitude', );
      // this.body.append('state', );
      // this.body.append('country', );
    });
  }
}
