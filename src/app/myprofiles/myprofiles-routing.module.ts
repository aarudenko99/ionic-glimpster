import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyprofilesPage } from './myprofiles.page';

const routes: Routes = [
  {
    path: '',
    component: MyprofilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyprofilesPageRoutingModule {}
