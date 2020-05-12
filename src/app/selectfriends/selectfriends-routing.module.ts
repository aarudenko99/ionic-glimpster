import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectfriendsPage } from './selectfriends.page';

const routes: Routes = [
  {
    path: '',
    component: SelectfriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectfriendsPageRoutingModule {}
