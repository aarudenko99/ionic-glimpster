import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostmediaPage } from './postmedia.page';

const routes: Routes = [
  {
    path: '',
    component: PostmediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostmediaPageRoutingModule {}
