import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  comingImage = "";
  comingUser = "";
  comingTitle = "";
  comingDateTime = "";

  placeholderImage = "../../assets/imgs/placeholder.png";

  pastContest = [];

  constructor(
    public allService: AllService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public storage: Storage,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.showLoader();
    this.imageBaseUrl = this.allService.getImageBaseUrl();
    this.allService.getAllContest().subscribe(
      data => {
        if(data['success'] == 1) {
          this.dismissLoading();
          this.comingImage = this.imageBaseUrl + data['upcoming_contest'][0]['media'];
          this.comingUser = data['upcoming_contest'][0]['username'];
          this.comingTitle = data['upcoming_contest'][0]['title'];
          this.comingDateTime = data['upcoming_contest'][0]['start_date'] + " at " + data['upcoming_contest'][0]['start_time'] + " (GMT)";

          this.pastContest = data['passed_contest'];
          this.dismissLoading();
        }
        
      }
    )
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
