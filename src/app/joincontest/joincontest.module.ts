import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoincontestPageRoutingModule } from './joincontest-routing.module';

import { JoincontestPage } from './joincontest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoincontestPageRoutingModule
  ],
  declarations: [JoincontestPage]
})
export class JoincontestPageModule {}
