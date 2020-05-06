import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-contests',
  templateUrl: './all-contests.page.html',
  styleUrls: ['./all-contests.page.scss'],
})
export class AllContestsPage implements OnInit {
  allcontests = [
    { imageurl: '../../assets/imgs/logo.png', content: 'allproducts' },
    { imageurl: '../../assets/imgs/logo.png', content: 'allproducts' },
    { imageurl: '../../assets/imgs/logo.png', content: 'allproducts' },
    { imageurl: '../../assets/imgs/logo.png', content: 'allproducts' },
    { imageurl: '../../assets/imgs/logo.png', content: 'allproducts' },
  ];

  constructor() { }

  ngOnInit() {
    // this.allcontests = [
    //   image: '../../assets/imgs/logo.png',

    // ]
  }

}
