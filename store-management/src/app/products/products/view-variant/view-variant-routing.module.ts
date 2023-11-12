import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewVariantPage } from './view-variant.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVariantPage
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewVariantPageRoutingModule {}
