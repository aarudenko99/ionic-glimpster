import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

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
  navigationExtras: NavigationExtras;
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
    this.allService.showLoader();
    this.allService.getAllContest().subscribe(
      data => {
        if(data['success'] == 1) {
          this.imageBaseUrl = this.allService.getImageBaseUrl();
          this.upcomingContest = data['upcoming_contest']
          this.pastContest = data['passed_contest'];
          // this.navigationExtras = {
          //   state: {
          //     upcomingContest: this.upcomingContest,
          //     pastContest: this.pastContest,
          //     imageBaseUrl: this.imageBaseUrl
          //   }
          // };
          this.allService.dismissLoading();
        }
        else {
          this.allService.presentToast("Error");
          this.allService.dismissLoading();
        }
        
      },

      err => {
        console.log(err);
        this.allService.presentToast("Network error");
        this.allService.dismissLoading();
      }
    )
  }

  detailContest(allcontest) {
    
    this.navigationExtras = {
      state: {
        detailContest: allcontest,
        imageBaseUrl: this.imageBaseUrl
      }
    }
    this.router.navigate(['/detailcontest'], this.navigationExtras);
  }
}
