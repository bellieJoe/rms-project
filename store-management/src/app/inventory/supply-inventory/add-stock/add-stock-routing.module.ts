import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddStockPage } from './add-stock.page';

const routes: Routes = [
  {
    path: '',
    component: AddStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddStockPageRoutingModule {}
