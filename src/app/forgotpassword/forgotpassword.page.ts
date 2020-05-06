import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { AllService } from '../all.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  forgotForm:  FormGroup;
  passwordType: string = "password";
  passwordShown: boolean = false;
  loading: any;

  constructor(
    private allService: AllService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  togglePassword(){
    if(this.passwordShown) {
      this.passwordType = "password";
      this.passwordShown = false;
    } else {
      this.passwordType = "text";
      this.passwordShown = true;
    }
  }

  requestPassword(passwordData) {
    // console.log(passwordData);
    this.showLoader();
    const body = new FormData();
    body.append('email', passwordData.email);

    this.allService.requestPassword(body).subscribe(data=>{
      // console.log('data', data);
      if(data) {
        data['id']
        const body1 = new FormData();
        body1.append('password', passwordData.password);
        body1.append('user_id', data['id']);
        this.allService.forgorPassword(body1).subscribe(data=>{
          if(data['success'] == 1) {
            this.presentToast("Password Changed");
            // this.dismissLoading();
            this.router.navigate(['/login']);
          }
          else {
            // this.dismissLoading();
            this.presentToast("Error while updating Product Please try again");
          }
        })
      }
      else {
        this.presentToast("Email doesn't exist");
        this.forgotForm.reset();
      }
      this.dismissLoading();
      // if(data['success'] == 1) {
      // }
      // else {
      //   return;
      // }
    },(err)=>{
      console.log(err);
      console.log("Error = ",err.error);
    })
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
