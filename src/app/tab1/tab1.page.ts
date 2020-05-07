import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AllService } from '../all.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading: any;
  imageBaseUrl = "";
  comingImage = "";
  pastContest = [];
  upcomingContest = [];
  navigationExtras: NavigationExtras;

  constructor(
    private allService: AllService,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.showLoader();
    this.allService.getAllContest().subscribe(
      data => {
        if(data['success'] == 1) {
          this.imageBaseUrl = this.allService.getImageBaseUrl();
          this.upcomingContest = data['upcoming_contest']
          this.pastContest = data['passed_contest'];
          this.navigationExtras = {
            state: {
              upcomingContest: this.upcomingContest,
              pastContest: this.pastContest,
              imageBaseUrl: this.imageBaseUrl
            }
          };
          this.dismissLoading();
        }
        else {
          this.presentToast("Error");
          this.dismissLoading();
        }
        
      },

      err => {
        console.log(err);
        this.presentToast("Network error");
        this.dismissLoading();
      }
    )
  }

  viewAll() {
    console.log(this.navigationExtras);
    this.router.navigate(['/all-contests'], this.navigationExtras);
  }

  detailContest(detailContest) {
    // console.log(detailContest);
    this.navigationExtras = {
      state: {
        detailContest: detailContest,
        imageBaseUrl: this.imageBaseUrl
      }
    }
    this.router.navigate(['/detailcontest'], this.navigationExtras);
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({
      message: 'please wait',
      backdropDismiss: true,
    });
    
    this.loading.present();
    await this.loading.onDidDismiss();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

}
