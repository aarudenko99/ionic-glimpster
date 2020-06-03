import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcontestPageRoutingModule } from './editcontest-routing.module';

import { EditcontestPage } from './editcontest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcontestPageRoutingModule
  ],
  declarations: [EditcontestPage]
})
export class EditcontestPageModule {}
