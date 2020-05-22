import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';
import { AllService } from '../all.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
})
export class AdsPage implements OnInit {

  constructor(
    private storage: Storage,
    private allService: AllService
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userinfo => {
        console.log(userinfo);
      }
    )
  }

}
