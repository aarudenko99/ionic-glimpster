import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

let Url = 'http://glimpsters.betaplanets.com/MobileApp/';
let imageBaseUrl = 'http://glimpsters.betaplanets.com/MobileApp/uploads/';

@Injectable({
  providedIn: 'root'
})
export class AllService {
  loading: any;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastController: ToastController
  ) { }

  getImageBaseUrl() {
    return imageBaseUrl;
  }

  doLogin(logindata) {
    return this.http.post(Url+'Api/login', logindata).pipe(
      map(data => {
        return data;
      })
    )
  }
  
  doSignup(target_email) {
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

  requestPassword(request_email) {
    return this.http.post(Url+'Api/check_email', request_email).pipe(
      map(data => {
        return data;
      })
    )
  }

  forgorPassword(new_data) {
    return this.http.post(Url+'Api/forgot_password', new_data).pipe(
      map(data => {
        return data;
      })
    )
  }

  getAllContest() {
    return this.http.get(Url+'Contest/get_all_contest').pipe(
      map(data => {
        return data;
      })
    )
  }

  getContestDetails(detail_info) {
    return this.http.post(Url+"Contest/get_contest_details", detail_info).pipe(
      map(data => {
        return data;
      })
    )
  }

  getUserLocation(user_id) {
    return this.http.post(Url+"Profile/users_location", user_id).pipe(
      map(data => {
        return data;
      })
    )
  }

  createPost(user_info) {
    return this.http.post(Url+"Post/create_status_post", user_info).pipe(
      map(data => {
        return data;
      })
    )
  }

  getPosts(userInfo) {
    return this.http.post(Url+"Post/get_posts", userInfo).pipe(
      map(data => {
        return data;
      })
    )
  }

  editPost(userInfo) {
    return this.http.post(Url+"Post/edit_post", userInfo).pipe(
      map(data => {
        return data;
      })
    )
  }

  deletePost(deleteInfo) {
    return this.http.post(Url+"Post/Delete", deleteInfo).pipe(
      map(data => {
        return data;
      })
    )
  }

  reportPost(reportInfo) {
    return this.http.post(Url+"Post/report_user", reportInfo).pipe(
      map(data => {
        return data;
      })
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
