import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllcommentPage } from './allcomment.page';

const routes: Routes = [
  {
    path: '',
    component: AllcommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllcommentPageRoutingModule {}
