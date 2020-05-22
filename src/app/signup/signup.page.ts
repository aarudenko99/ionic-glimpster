import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AllService } from '../all.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  loading: any;
  passwordType: string = "password";
  passwordShown: boolean = false;
  passwordType1: string = "password";
  passwordShown1: boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public router: Router,
    public allService: AllService
  ) { 
    
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'firstname': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'lastname': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'mobilenumber': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'birthday': new FormControl(''),
      'gender': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'confirmpassword': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  doSignup(signupData) {
    const body = new FormData();
    body.append('email', signupData.email);
    this.showLoader();
    if(signupData.password != signupData.confirmpassword) {
      this.presentToast("Passwords don't match");
      signupData.password = '';
      signupData.confirmpassword = '';
      return;
    }
    this.allService.doSignup(body).subscribe(
      data => {
        this.dismissLoading();
        if(data['success'] == 1) {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              email: signupData.email,
              username: signupData.username,
              firstname: signupData.firstname,
              lastname: signupData.lastname,
              mobilenummber: signupData.mobilenummber,
              birthday: signupData.birthday,
              password: signupData.password,
              otp: data['otp']
            }
          };
          this.signupForm.reset();
          this.router.navigate(['/otp'], navigationExtras);
        }
        else {
          this.presentToast(data['message']);
        }
      },
      err => {
        this.dismissLoading();
      }
    )
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

  togglePassword1(){
    if(this.passwordShown1) {
      this.passwordType1 = "password";
      this.passwordShown1 = false;
    } else {
      this.passwordType1 = "text";
      this.passwordShown1 = true;
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
