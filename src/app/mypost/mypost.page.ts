import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    // private 
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

}
