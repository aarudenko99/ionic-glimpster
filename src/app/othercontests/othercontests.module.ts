import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OthercontestsPageRoutingModule } from './othercontests-routing.module';

import { OthercontestsPage } from './othercontests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OthercontestsPageRoutingModule
  ],
  declarations: [OthercontestsPage]
})
export class OthercontestsPageModule {}
