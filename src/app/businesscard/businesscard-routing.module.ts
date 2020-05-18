import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinesscardPage } from './businesscard.page';

const routes: Routes = [
  {
    path: '',
    component: BusinesscardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinesscardPageRoutingModule {}
