import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailcontestPage } from './detailcontest.page';

const routes: Routes = [
  {
    path: '',
    component: DetailcontestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailcontestPageRoutingModule {}
