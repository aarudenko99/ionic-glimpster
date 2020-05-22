import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AllService } from '../all.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading: any;
  passwordType: string = "password";
  passwordShown: boolean = false;

  constructor(
    public allService: AllService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public storage: Storage,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
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
  doLogin(loginData){
    const body = new FormData();
    body.append('email', loginData.email);
    body.append('password', loginData.password);
    this.showLoader();

    this.allService.doLogin(body).subscribe(data=>{
      if(data['success'] == 1) {
        this.storage.set('user', data);
        console.log(data);
        this.dismissLoading();
        this.router.navigate(['/tabs']);
      }
      else {
        this.presentToast("Email or password incorrect");
        this.dismissLoading();
        return;
      }
    },(err)=>{
    })
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
