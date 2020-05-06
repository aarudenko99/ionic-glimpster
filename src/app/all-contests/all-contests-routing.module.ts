import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllContestsPage } from './all-contests.page';

const routes: Routes = [
  {
    path: '',
    component: AllContestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllContestsPageRoutingModule {}
