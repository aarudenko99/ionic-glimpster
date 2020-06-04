import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcontestPage } from './addcontest.page';

const routes: Routes = [
  {
    path: '',
    component: AddcontestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcontestPageRoutingModule {}
