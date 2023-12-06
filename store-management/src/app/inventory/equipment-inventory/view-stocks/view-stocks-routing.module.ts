import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewStocksPage } from './view-stocks.page';

const routes: Routes = [
  {
    path: '',
    component: ViewStocksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewStocksPageRoutingModule {}
