import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastController, LoadingController } from '@ionic/angular';

import { AllService } from '../all.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  input_otp = {};
  e_mail: string="";
  local_otp: string="";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private allService: AllService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // console.log('my otp', params.otp);
      // console.log('this', params.email);
      this.e_mail = params.email;
      this.local_otp = params.otp;
      // console.log('that', params.signupData['email']);
    });
  }

  verify() {
    const body = new FormData();
    // console.log('my otp', this.input_otp);
    this.route.queryParams.subscribe(params => {
      console.log('my otp', this.input_otp);
      if(this.input_otp['title'] == this.local_otp) {

        // if()
        body.append('email', params.email);
        body.append('name', params.username);
        body.append('phone', params.mobilenumber);
        body.append('password', params.password);
        body.append('first_name', params.firstname);
        body.append('last_name', params.lastname);
        body.append('dob', params.birthday);
      
        this.allService.verify(body).subscribe(
          data => {
            if(data['success'] == 1) {
              console.log(data['userinfo']);
              this.router.navigate(['/login']);
            }
            else {
              this.presentToast('Username or Email Already Exists');
              this.router.navigate(['/signup']);
            }
          }
        )
      }
      else {
        if(this.input_otp == '') this.presentToast("Please input 4 digits");
        else this.presentToast("OTP not valid");
        return;
      }
      // body.append('email', params.signupData.email);
    });
  }

  resendOTP() {
    const body = new FormData();
    body.append('email', this.e_mail);
    this.allService.doSignup(body).subscribe(
      data => {
        console.log(data);
        if(data['success'] == 1) {
          this.local_otp = data['otp'];
          this.presentToast("One time password was sent. Please check mailbox.");
        }
        else {
          this.presentToast(data['message']);
        }
      }
    )
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
