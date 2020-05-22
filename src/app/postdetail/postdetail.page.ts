import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.page.html',
  styleUrls: ['./postdetail.page.scss'],
})
export class PostdetailPage implements OnInit {
  created_at = "";
  username = "";
  userimage = "";
  post_text = "";
  likes = "";
  comments = "";
  post_type = ""
  media = "";
  
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  avatarImage = 'http://1.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=96&d=mm&r=g';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stroage: Storage
  ) { }

  ngOnInit() {
    this.stroage.get('user').then(
      userinfo => {
        this.username = userinfo['user_info'].username;
        this.userimage = userinfo['user_info'].image;
      }
    )
    
    this.route.queryParams.subscribe(params => {
      this.created_at = params.created_at;
      this.post_text = params.post_text;
      this.likes = params.likes;
      this.comments = params.comments;
      this.post_type = params.post_type;
      this.media = params.media;
    });
  }

}
