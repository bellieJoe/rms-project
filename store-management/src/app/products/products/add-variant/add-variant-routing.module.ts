import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVariantPage } from './add-variant.page';

const routes: Routes = [
  {
    path: '',
    component: AddVariantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVariantPageRoutingModule {}
