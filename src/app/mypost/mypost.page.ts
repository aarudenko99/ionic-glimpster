import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.page.html',
  styleUrls: ['./mypost.page.scss'],
})
export class MypostPage implements OnInit {
  userName = "";
  myPosts = [];
  imageBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/";
  videoBaseUrl = "http://glimpsters.betaplanets.com/MobileApp/uploads/video/";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private navExtras: NavigationExtras
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.userName = this.router.getCurrentNavigation().extras.state.userName;
        this.myPosts = this.router.getCurrentNavigation().extras.state.myPosts;
        console.log(this.myPosts);
      }
    )
  }

  viewPost(activePost) {
    let navExtras: NavigationExtras = {
      queryParams: {
        created_at: activePost.created_at,
        post_text: activePost.post_text,
        likes: activePost.likes,
        comments: activePost.comments,
        post_type: activePost.post_type,
        media: activePost.media,
      }
    };
    // this.navExtras.queryParams
    console.log(activePost);
    this.router.navigate(['/postdetail'], navExtras);
  }

}
