import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailcontestPageRoutingModule } from './detailcontest-routing.module';

import { DetailcontestPage } from './detailcontest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailcontestPageRoutingModule
  ],
  declarations: [DetailcontestPage]
})
export class DetailcontestPageModule {}
