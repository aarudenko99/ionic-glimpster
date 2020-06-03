import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycontestsPageRoutingModule } from './mycontests-routing.module';

import { MycontestsPage } from './mycontests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycontestsPageRoutingModule
  ],
  declarations: [MycontestsPage]
})
export class MycontestsPageModule {}
