import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-businesscard',
  templateUrl: './businesscard.page.html',
  styleUrls: ['./businesscard.page.scss'],
})
export class BusinesscardPage implements OnInit {
  body = new FormData();
  saved = true;
  pending = false;
  savedCard : any;
  pendingCard: any;

  constructor(
    private storage: Storage,
    private allService: AllService
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userinfo => {
        // console.log(userinfo);
        this.body.append('user_id', userinfo.user_id);
        this.allService.acceptedRequests(this.body).subscribe(
          data => {
            this.savedCard = data;
            console.log(this.savedCard);
          }
        )
        // this.allService.getBusinessCard(this.body).subscribe(
        //   data => {
        //     this.savedCard = data;
        //     console.log(data);
        //   }
        // )
      }
    )
  }

  onSaved() {
    this.saved = true;
    this.pending = false;
  }

  onPending() {
    this.pending = true;
    this.saved = false;
  }

}
