import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // async selectImage(type) {
  //   this.images = [];
  //   this.type=type;
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Select Image source",
  //     buttons: [{
  //       text: 'Load image from Library',
  //       handler: () => {
  //         this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  //       }
  //     },
  //     {
  //       text: 'capture image using Camera',
  //       handler: () => {
  //         this.takePicture(this.camera.PictureSourceType.CAMERA);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

}
