import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Storage } from '@ionic/storage';
// import { } from '';
import { AllService } from '../all.service';

@Component({
  selector: 'app-mycontests',
  templateUrl: './mycontests.page.html',
  styleUrls: ['./mycontests.page.scss'],
})
export class MycontestsPage implements OnInit {
  body = new FormData();
  empty = "";
  myContests = [];
  placeholderImage = "../../assets/imgs/placeholder.png";
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";

  constructor(
    private storage: Storage,
    private allService: AllService,
    private router: Router,
    // private navigationExtras: NavigationExtras
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('user').then(
      userinfo => {
        this.body.append('user_id', userinfo.user_id);
        this.allService.getMyContests(this.body).subscribe(
          data => {
            if(data['success'] == 1) {
              console.log(data);
              this.myContests = data['contest'];
            }
          }
        )
      }
    )
  }

  editContest(myContest) {
    let navigationExtra: NavigationExtras = {
      state: {
        myContest: myContest
      }
    }
    this.router.navigate(['/editcontest'], navigationExtra);
  }
  deleteContest(contestInfo) {
    this.body.append('contest_id', contestInfo);
    this.allService.deleteContest(this.body).subscribe(
      data => {
        this.allService.presentToast(data['message']);
        const ind = this.myContests.findIndex(x => x.id === contestInfo);
        this.myContests.splice(ind, 1);
      }
    )
  }

}
