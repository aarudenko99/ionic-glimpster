import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypostPageRoutingModule } from './mypost-routing.module';

import { MypostPage } from './mypost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypostPageRoutingModule
  ],
  declarations: [MypostPage]
})
export class MypostPageModule {}
