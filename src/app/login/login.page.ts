import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    public storage: Storage
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

    this.allService.doLogin(body).subscribe(data=>{
      console.log('data', data);
      this.storage.set('user', data);
      this.router.navigate(['/tabs']);
    },(err)=>{
      // this.dismissLoading();
      console.log(err);
      console.log("Error = ",err.error);
      // this.errorMsg = 'User name or password invalid';
    })

    // this.showLoader();

    // this.allService.doLogin(loginData).subscribe(data=>{
    //   this.dismissLoading();
    //   let rs:any=[];
    //   rs =data;
    //   // console.log(" SUBSCRIBE  == ",rs);
    //    if(rs.status='ok'){
    //     this.storage.set('user', rs);
    //     this.storage.set('user_profile', rs);
        
    //     this.events.publish('userCheck:created',rs);
    //     this.loginForm.reset();
    //     this.router.navigate(['/home']);

    //    }
    // },(err)=>{
    //   this.dismissLoading();
    //   console.log(err);
    //   console.log("Error = ",err.error);
    //   this.errorMsg = 'User name or password invalid';
    // })
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

}
