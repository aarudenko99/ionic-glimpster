import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypostPage } from './mypost.page';

const routes: Routes = [
  {
    path: '',
    component: MypostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypostPageRoutingModule {}
