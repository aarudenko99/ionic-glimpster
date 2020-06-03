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
      }
    )
    
  }

  updateContest(detailContest) {
    // console.log("here I am ");
    // console.log(this.title, "\n", this.startDate.split("T")[0], "\n", this.endTime.split("T")[1]);
    this.body.append('contest_id', detailContest.id);

    if(this.title == "") this.body.append('title', detailContest.title);
    else this.body.append('title', this.title);

    if(this.startDate == "") this.body.append('start_date', detailContest.start_date);
    else this.body.append('start_date', this.startDate.split("T")[0]);

    if(this.startTime == "") this.body.append('start_time', detailContest.start_time);
    else this.body.append('start_time', this.startTime.split("T")[1]);

    if(this.endDate == "") this.body.append('end_date', detailContest.end_date);
    else this.body.append('end_date', this.endDate.split("T")[0]);

    if(this.endTime == "") this.body.append('end_time', detailContest.end_time);
    else this.body.append('end_time', this.endTime.split("T")[1]);

    this.allService.updateContest(this.body).subscribe(
      data => {
        console.log(data);
        this.allService.presentToast(data['message']);
      }
    )
  }

}
