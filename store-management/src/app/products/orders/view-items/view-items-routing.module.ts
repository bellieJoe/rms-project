import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewItemsPage } from './view-items.page';

const routes: Routes = [
  {
    path: '',
    component: ViewItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewItemsPageRoutingModule {}
