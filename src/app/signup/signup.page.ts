import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

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
    if(signupData.password != signupData.confirmpassword) {
      this.presentToast("Passwords don't match");
      signupData.password = '';
      signupData.confirmpassword = '';
      return;
    }
    console.log("signupData------", signupData);
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
