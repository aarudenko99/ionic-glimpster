import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AllService} from '../all.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  newPass = "";
  confirmPass = "";
  userId = "";

  constructor(
    private allService: AllService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('user').then(
      userinfo => {
        this.userId = userinfo['user_id'];
        console.log(userinfo);
      }
    )
  }

  changePassword() {
    if(this.newPass != this.confirmPass) {
      console.log(this.newPass.length);
      this.allService.presentToast("Passwords don't match");
      return;
    }
    if(this.newPass == '') {
      this.allService.presentToast("Please enter new password");
      return;
    }
    if(this.confirmPass == '') {
      this.allService.presentToast("Please enter confirm password");
      return;
    }
    let body = new FormData();
    body.append('user_id', this.userId);
    body.append('password', this.newPass);
    this.allService.forgorPassword(body).subscribe(
      data => {
        if(data['success'] == 1) {
          console.log(data);
          this.allService.presentToast(data['message']);
        }
        else {
          this.allService.presentToast("Error occured. Please try again.");
        }
        this.newPass = "";
        this.confirmPass = "";
      }
    )
  }

}
