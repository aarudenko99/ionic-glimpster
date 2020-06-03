import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycontestsPage } from './mycontests.page';

const routes: Routes = [
  {
    path: '',
    component: MycontestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycontestsPageRoutingModule {}
