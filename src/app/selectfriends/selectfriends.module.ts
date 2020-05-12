import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectfriendsPageRoutingModule } from './selectfriends-routing.module';

import { SelectfriendsPage } from './selectfriends.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectfriendsPageRoutingModule
  ],
  declarations: [SelectfriendsPage]
})
export class SelectfriendsPageModule {}
