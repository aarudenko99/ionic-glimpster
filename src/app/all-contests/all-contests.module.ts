import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllContestsPageRoutingModule } from './all-contests-routing.module';

import { AllContestsPage } from './all-contests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllContestsPageRoutingModule
  ],
  declarations: [AllContestsPage]
})
export class AllContestsPageModule {}
