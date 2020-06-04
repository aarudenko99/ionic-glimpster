import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcontestPageRoutingModule } from './addcontest-routing.module';

import { AddcontestPage } from './addcontest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcontestPageRoutingModule
  ],
  declarations: [AddcontestPage]
})
export class AddcontestPageModule {}
