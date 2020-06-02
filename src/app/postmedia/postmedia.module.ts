import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostmediaPageRoutingModule } from './postmedia-routing.module';

import { PostmediaPage } from './postmedia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostmediaPageRoutingModule
  ],
  declarations: [PostmediaPage]
})
export class PostmediaPageModule {}
