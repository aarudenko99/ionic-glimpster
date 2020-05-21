import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyprofilesPageRoutingModule } from './myprofiles-routing.module';

import { MyprofilesPage } from './myprofiles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyprofilesPageRoutingModule
  ],
  declarations: [MyprofilesPage]
})
export class MyprofilesPageModule {}
