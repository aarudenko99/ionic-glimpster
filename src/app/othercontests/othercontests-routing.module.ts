import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthercontestsPage } from './othercontests.page';

const routes: Routes = [
  {
    path: '',
    component: OthercontestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthercontestsPageRoutingModule {}
