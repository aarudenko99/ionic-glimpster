import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosttextPage } from './posttext.page';

const routes: Routes = [
  {
    path: '',
    component: PosttextPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosttextPageRoutingModule {}
