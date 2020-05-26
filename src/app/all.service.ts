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

  editPost(updateInfo) {
    return this.http.post(Url+"Post/edit_post", updateInfo).pipe(
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

  likePost(likeInfo) {
    return this.http.post(Url+"Post/like_post", likeInfo).pipe(
      map(data => {
        return data;
      })
    )
  }

  addPostComment(commentInfo) {
    return this.http.post(Url+"Post/add_post_comment", commentInfo).pipe(
      map(data => {
        return data;
      })
    )
  }

  updatePostComment(commentInfo) {
    return this.http.post(Url+"Post/update_post_comment", commentInfo).pipe(
      map(data => {
        return data;
      })
    )
  }

  getComments(commentInfo) {
    return this.http.post(Url+'Post/get_comments', commentInfo).pipe(
      map(data => {
        return data;
      })
    )
  }

  deleteComment(deleteInfo) {
    return this.http.post(Url+'Post/delete_post_comment', deleteInfo).pipe(
      map(data => {
        return data;
      })
    )
  }

  getMyPosts(userinfo) {
    return this.http.post(Url+'Post/my_posts', userinfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  getFollowing(userinfo) {
    return this.http.post(Url+'Follow/get_following', userinfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  getFollowers(userinfo) {
    return this.http.post(Url+'Follow/get_followers', userinfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  updateUserInfo(userinfo) {
    return this.http.post(Url+'Api/update_userinfo', userinfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  verifiedRequest(userinfo) {
    return this.http.post(Url+'Api/verified_account_request', userinfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  sponsorRequest(userinfo) {
    return this.http.post(Url+'Api/sponser_request', userinfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  getGifts() {
    return this.http.get(Url+'Profile/gifts').pipe(
      map(data => {
        return data;
      })
    )
  }

  sendGift(giftInfo) {
    return this.http.post(Url+'Profile/send_gift', giftInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  receivedGifts(userInfo) {
    return this.http.post(Url+'Profile/receivedGifts', userInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  getBusinessCard(userInfo) {
    return this.http.post(Url+'Profile/get_business_card', userInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  acceptedRequests(userInfo) {
    return this.http.post(Url+'Profile/accepted_requests', userInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  pendingRequests(userInfo) {
    return this.http.post(Url+'Profile/pending_requests', userInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  getBio(userInfo) {
    return this.http.post(Url+'Profile/get_bio', userInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  updateBio(bioInfo) {
    return this.http.post(Url+'Profile/update_bio', bioInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  getBusinessProfile(userInfo) {
    return this.http.post(Url+'Profile/get_business_profile', userInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  updateBusiness(businessInfo) {
    return this.http.post(Url+'Profile/update_business', businessInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  updateUserImage(imageInfo) {
    return this.http.post(Url+'Api/update_user_image', imageInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  getAds(adsInfo) {
    return this.http.post(Url+'Contest/get_banner_ads', adsInfo).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  getPoints(pointsInfo) {
    return this.http.post(Url+'Api/points', pointsInfo).pipe(
      map(
        data => {
          return data;
        }
      )
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
