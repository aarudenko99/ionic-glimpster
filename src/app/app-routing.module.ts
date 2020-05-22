import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'all-contests',
    loadChildren: () => import('./all-contests/all-contests.module').then( m => m.AllContestsPageModule)
  },
  {
    path: 'detailcontest',
    loadChildren: () => import('./detailcontest/detailcontest.module').then( m => m.DetailcontestPageModule)
  },
  {
    path: 'selectfriends',
    loadChildren: () => import('./selectfriends/selectfriends.module').then( m => m.SelectfriendsPageModule)
  },
  {
    path: 'editpost',
    loadChildren: () => import('./editpost/editpost.module').then( m => m.EditpostPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'allcomment',
    loadChildren: () => import('./allcomment/allcomment.module').then( m => m.AllcommentPageModule)
  },
  {
    path: 'mypost',
    loadChildren: () => import('./mypost/mypost.module').then( m => m.MypostPageModule)
  },
  {
    path: 'postdetail',
    loadChildren: () => import('./postdetail/postdetail.module').then( m => m.PostdetailPageModule)
  },
  {
    path: 'businesscard',
    loadChildren: () => import('./businesscard/businesscard.module').then( m => m.BusinesscardPageModule)
  },
  {
    path: 'coupons',
    loadChildren: () => import('./coupons/coupons.module').then( m => m.CouponsPageModule)
  },
  {
    path: 'gifts',
    loadChildren: () => import('./gifts/gifts.module').then( m => m.GiftsPageModule)
  },
  {
    path: 'myprofiles',
    loadChildren: () => import('./myprofiles/myprofiles.module').then( m => m.MyprofilesPageModule)
  },
  {
    path: 'ads',
    loadChildren: () => import('./ads/ads.module').then( m => m.AdsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
