import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AllService } from '../all.service';

@Component({
  selector: 'app-detailcontest',
  templateUrl: './detailcontest.page.html',
  styleUrls: ['./detailcontest.page.scss'],
})
export class DetailcontestPage implements OnInit {
  loading: any;
  detailContest = [];
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "../../assets/imgs/placeholder.png";
  body = new FormData();
  otherContests = [];

  constructor(
    public allService: AllService,
    public router: Router,
    public storage: Storage,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {  
    // this.allService.showLoader();
    this.route.queryParams.subscribe(params => {
      this.detailContest = this.router.getCurrentNavigation().extras.state.detailContest;
      // this.imageBaseUrl = this.router.getCurrentNavigation().extras.state.imageBaseUrl;
      this.renderData(this.detailContest);
      // console.log(this.detailContest['id']);
      // this.allService.dismissLoading();
    });
  }

  renderData(detailData) {
    this.detailContest = detailData;
    this.body.append('user_id', detailData['user_id']);
    this.body.append('contest_id', detailData['id']);
    this.allService.getContestDetails(this.body).subscribe(
      data => {
        if(data['success'] == 1) {
          this.otherContests = data['other_contest'];
          console.log(data);
        }
      }
    )
  }

  doYet() {
    this.allService.presentToast("Contest not started yet");
  }

  doJoin() {
    this.allService.presentToast("You have already joined this contest");
  }

  // goContest(currentContest) {
  //   console.log(currentContest);
  // }

}
