import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { LoadingController } from '@ionic/angular';

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
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.compose([
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
