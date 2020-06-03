import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcontestPage } from './editcontest.page';

const routes: Routes = [
  {
    path: '',
    component: EditcontestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcontestPageRoutingModule {}
