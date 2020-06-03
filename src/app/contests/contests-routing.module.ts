import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContestsPage } from './contests.page';

const routes: Routes = [
  {
    path: '',
    component: ContestsPage,
    children: [
      {
        path: 'mycontests',
        loadChildren: () => import('../mycontests/mycontests.module').then(m => m.MycontestsPageModule)
      },
      {
        path: 'othercontests',
        loadChildren: () => import('../othercontests/othercontests.module').then(m => m.OthercontestsPageModule)
      },
      // {
      //   path: 'postvideo',
      //   loadChildren: () => import('../postvideo/postvideo.module').then(m => m.PostvideoPageModule)
      // },
      // {
      //   path: 'tab5',
      //   loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      // },
      {
        path: '',
        redirectTo: '/contests/mycontests',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestsPageRoutingModule {}
