import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllcommentPageRoutingModule } from './allcomment-routing.module';

import { AllcommentPage } from './allcomment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllcommentPageRoutingModule
  ],
  declarations: [AllcommentPage]
})
export class AllcommentPageModule {}
