import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentInventoryPage } from './equipment-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentInventoryPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'add-stock',
    loadChildren: () => import('./add-stock/add-stock.module').then( m => m.AddStockPageModule)
  },
  {
    path: 'view-stocks',
    loadChildren: () => import('./view-stocks/view-stocks.module').then( m => m.ViewStocksPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentInventoryPageRoutingModule {}
