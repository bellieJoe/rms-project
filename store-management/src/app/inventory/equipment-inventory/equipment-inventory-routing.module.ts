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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentInventoryPageRoutingModule {}
