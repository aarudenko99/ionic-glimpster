import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosttextPageRoutingModule } from './posttext-routing.module';

import { PosttextPage } from './posttext.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosttextPageRoutingModule
  ],
  declarations: [PosttextPage]
})
export class PosttextPageModule {}
