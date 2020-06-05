import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Storage } from '@ionic/storage';

import { AllService } from '../all.service';

@Component({
  selector: 'app-othercontests',
  templateUrl: './othercontests.page.html',
  styleUrls: ['./othercontests.page.scss'],
})
export class OthercontestsPage implements OnInit {
  otherContests = [];
  userId : any;
  placeholderImage = "../../assets/imgs/placeholder.png";
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";

  constructor(
    private allService: AllService,
    private stroage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.allService.getAllContest().subscribe(
      data => {
        if(data['success'] == 1) {
          this.stroage.get('user').then(
            userinfo => {
              this.userId = userinfo.user_id;
              this.otherContests = data['upcoming_contest'].filter(
                (item) => {
                  return item.user_id != this.userId;
                }
              )
              console.log(this.otherContests);
            }
          )
        }
      }
    )
  }

  joinContest(otherContest) {
    let navigationExtra: NavigationExtras = {
      state: {
        otherContest: otherContest
      }
    }

    this.router.navigate(['/joincontest'], navigationExtra);
  }

}
