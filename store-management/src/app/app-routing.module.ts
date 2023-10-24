import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule),
    canActivate: [GuestGuard]
  },
  // {
  //   path: 'users',
  //   loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'user-access',
    loadChildren: () => import('./users/user-access/user-access.module').then( m => m.UserAccessPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test/test.module').then( m => m.TestPageModule)
  },  {
    path: 'test2',
    loadChildren: () => import('./test/test2/test2.module').then( m => m.Test2PageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
