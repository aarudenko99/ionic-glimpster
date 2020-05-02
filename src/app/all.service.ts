import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';

let Url = 'http://glimpsters.betaplanets.com/MobileApp/';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) { }
  
  //logindata = {
  //   username: "test@test.com",
  //   password: "123123"
  // }
  doLogin(logindata) {
    return this.http.post(Url+'Api/login', logindata).pipe(
      map(data => {
        return data;
      })
    )
  }
  
  doSignup(target_email) {
    // console.log(logindata)
    return this.http.post(Url+'Api/email_otp', target_email).pipe(
      map(data => {
        return data;
      })
    )
  }

  verify(register_data) { 
    return this.http.post(Url+'Api/register_user', register_data).pipe(
      map(data => {
        return data;
      })
    )
  }
}
