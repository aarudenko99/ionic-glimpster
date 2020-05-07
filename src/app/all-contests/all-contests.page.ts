import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AllService } from '../all.service';

@Component({
  selector: 'app-all-contests',
  templateUrl: './all-contests.page.html',
  styleUrls: ['./all-contests.page.scss'],
})
export class AllContestsPage implements OnInit {
  loading: any;
  imageBaseUrl = "";
  placeholderImage = "../../assets/imgs/placeholder.png";

  pastContest = [];
  upcomingContest = [];

  constructor(
    public allService: AllService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public storage: Storage,
    public toastController: ToastController,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.imageBaseUrl = this.router.getCurrentNavigation().extras.state.imageBaseUrl;
      this.pastContest = this.router.getCurrentNavigation().extras.state.pastContest;
      this.upcomingContest = this.router.getCurrentNavigation().extras.state.upcomingContest;
      // console.log(this.upcomingContest);
    });
  }
}
