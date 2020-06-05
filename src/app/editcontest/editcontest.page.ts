import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AllService } from '../all.service';

@Component({
  selector: 'app-editcontest',
  templateUrl: './editcontest.page.html',
  styleUrls: ['./editcontest.page.scss'],
})
export class EditcontestPage implements OnInit {
  detailContest = [];
  body = new FormData();
  startDate = "";
  endDate = "";
  startTime = "";
  endTime = "";
  title = "";
  points : string;
  amount : string;
  views : string;
  // contestType : string;
  
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "../../assets/imgs/placeholder.png";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private allService: AllService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.detailContest = this.router.getCurrentNavigation().extras.state.myContest;
        console.log(this.detailContest);
        // this.startDate = this.detailContest['start_date'];
        // this.endDate = this.detailContest['end_date'];
        // this.startTime = this.detailContest['start_time'];
        // this.endTime = this.detailContest['end_time'];
        this.title = this.detailContest['title'];
        this.points = this.detailContest['points'];
        this.amount = this.detailContest['amount'];
        this.views = this.detailContest['views'];
        // this.contestType = this.detailContest['contestType'];
      }
    )
    
  }

  updateContest(detailContest) {
    // console.log("here I am ");
    // console.log(this.title, "\n", this.startDate.split("T")[0], "\n", this.endTime.split("T")[1]);
    this.body.append('contest_id', detailContest.id);

    if(this.startDate == "") this.body.append('start_date', detailContest.start_date);
    else this.body.append('start_date', this.startDate.split("T")[0]);

    if(this.startTime == "") this.body.append('start_time', detailContest.start_time);
    else this.body.append('start_time', this.startTime.split("T")[1]);

    if(this.endDate == "") this.body.append('end_date', detailContest.end_date);
    else this.body.append('end_date', this.endDate.split("T")[0]);

    if(this.endTime == "") this.body.append('end_time', detailContest.end_time);
    else this.body.append('end_time', this.endTime.split("T")[1]);
    console.log()

    // this.body.append('contestType', this.contestType);
    this.body.append('amount', this.amount);
    this.body.append('views', this.views);
    this.body.append('points', this.points);
    this.body.append('title', this.title);

    this.allService.updateContest(this.body).subscribe(
      data => {
        console.log(data);
        this.allService.presentToast(data['message']);
      }
    )
  }

}
