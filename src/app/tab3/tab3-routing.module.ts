import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    children: [
      {
        path: 'posttext',
        loadChildren: () => import('../posttext/posttext.module').then(m => m.PosttextPageModule)
      },
      {
        path: 'postmedia',
        loadChildren: () => import('../postmedia/postmedia.module').then(m => m.PostmediaPageModule)
      },
      {
        path: 'postvideo',
        loadChildren: () => import('../postvideo/postvideo.module').then(m => m.PostvideoPageModule)
      },
      // {
      //   path: 'tab5',
      //   loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      // },
      {
        path: '',
        redirectTo: '/tabs/tab3/posttext',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
