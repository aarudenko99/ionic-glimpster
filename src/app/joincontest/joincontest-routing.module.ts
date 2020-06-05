import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoincontestPage } from './joincontest.page';

const routes: Routes = [
  {
    path: '',
    component: JoincontestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoincontestPageRoutingModule {}
