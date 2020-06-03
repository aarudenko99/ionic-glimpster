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
    this.storage.get('user').then(
      userinfo => {
        this.body.append('user_id', '23');
        this.allService.getMyContests(this.body).subscribe(
          data => {
            if(data['success'] == 1) {
              console.log(data);
              this.myContests = data['contest'];
            }
            else {
              // this.empty = data['']
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

}
