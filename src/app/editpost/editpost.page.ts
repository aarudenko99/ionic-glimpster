import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AllService } from '../all.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.page.html',
  styleUrls: ['./editpost.page.scss'],
})
export class EditpostPage implements OnInit {
  post : any;
  updatedPost = "";
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  placeholderImage = "../../assets/imgs/profile/avatar.png";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private allService: AllService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.post = this.router.getCurrentNavigation().extras.state.editPost;
      this.updatedPost = this.post.post_text;
      console.log("my---------", this.router.getCurrentNavigation().extras.state.editPost);
    });
  }

  updatePost() {
    let updateInfo = new FormData();
    updateInfo.append('post_id', this.post.id);
    updateInfo.append('post_text', this.updatedPost);
    this.allService.editPost(updateInfo).subscribe(
      data => {
        if(data['success'] == 1) {
          console.log(data);
          this.router.navigate(['/tabs/tab1']);
        }
      }
    )
    console.log();
  }

}
