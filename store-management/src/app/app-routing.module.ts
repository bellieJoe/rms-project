import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
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
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'product-category',
    loadChildren: () => import('./products/product-category/product-category.module').then( m => m.ProductCategoryPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./products/menu/menu.module').then( m => m.MenuPageModule)
  },  {
    path: 'orders',
    loadChildren: () => import('./products/orders/orders.module').then( m => m.OrdersPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
