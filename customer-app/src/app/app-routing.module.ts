import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { AuthGuard } from './guards/auth.guard';
import { EmailVerifiedGuard } from './guards/email-verified.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu',
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
        canActivate: [AuthGuard, EmailVerifiedGuard]
      },
      {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule),
        canActivate: [AuthGuard,EmailVerifiedGuard]
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule),
        canActivate: [AuthGuard, EmailVerifiedGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [AuthGuard, EmailVerifiedGuard]
      },
    ]
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/auth/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'email-verification',
    loadChildren: () => import('./pages/email-verification/email-verification.module').then( m => m.EmailVerificationPageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },


  

  

  

  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
