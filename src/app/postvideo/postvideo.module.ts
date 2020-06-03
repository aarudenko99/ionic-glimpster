import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostvideoPageRoutingModule } from './postvideo-routing.module';

import { PostvideoPage } from './postvideo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostvideoPageRoutingModule
  ],
  declarations: [PostvideoPage]
})
export class PostvideoPageModule {}
