import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplyInventoryPage } from './supply-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: SupplyInventoryPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplyInventoryPageRoutingModule {}
