import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';
import { PrivilegeL1Guard } from './guards/privilege-l1.guard';

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
    canActivate: [AuthGuard, PrivilegeL1Guard]
  },
  // {
  //   path: 'signup',
  //   loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
  //   canActivate: [GuestGuard]
  // },
  {
    path: 'users',
    loadChildren: () => import('./users/users/users.module').then( m => m.UsersPageModule),
    canActivate: [AuthGuard, PrivilegeL1Guard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products/products.module').then( m => m.ProductsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-category',
    loadChildren: () => import('./products/product-category/product-category.module').then( m => m.ProductCategoryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./products/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./products/orders/orders.module').then( m => m.OrdersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./unauthorized/unauthorized.module').then( m => m.UnauthorizedPageModule)
  },  {
    path: 'supply-inventory',
    loadChildren: () => import('./inventory/supply-inventory/supply-inventory.module').then( m => m.SupplyInventoryPageModule)
  },
  {
    path: 'equipment-inventory',
    loadChildren: () => import('./inventory/equipment-inventory/equipment-inventory.module').then( m => m.EquipmentInventoryPageModule)
  },
  {
    path: 'barcode-reader',
    loadChildren: () => import('./barcode-reader/barcode-reader.module').then( m => m.BarcodeReaderPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
