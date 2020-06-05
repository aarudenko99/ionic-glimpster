import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AllService } from '../all.service';

@Component({
  selector: 'app-joincontest',
  templateUrl: './joincontest.page.html',
  styleUrls: ['./joincontest.page.scss'],
})
export class JoincontestPage implements OnInit {
  loading: any;
  otherContest = [];
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "../../assets/imgs/placeholder.png";
  body = new FormData();
  userId : string;

  constructor(
    public allService: AllService,
    public router: Router,
    public storage: Storage,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.otherContest = this.router.getCurrentNavigation().extras.state.otherContest;
      // this.renderData(this.detailContest);
    });
    this.storage.get('user').then(
      userinfo => {
        this.userId = userinfo.user_id;
      }
    )
  }

  joinContest(contestId) {
    console.log(contestId, " ", this.userId);
    this.body.append('user_id', this.userId);
    this.body.append('contest_id', contestId);
    this.allService.joinContest(this.body).subscribe(
      data => {
        this.allService.presentToast(data['message']);
      }
    )
  }

}
