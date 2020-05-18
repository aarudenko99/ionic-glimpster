import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinesscardPageRoutingModule } from './businesscard-routing.module';

import { BusinesscardPage } from './businesscard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinesscardPageRoutingModule
  ],
  declarations: [BusinesscardPage]
})
export class BusinesscardPageModule {}
