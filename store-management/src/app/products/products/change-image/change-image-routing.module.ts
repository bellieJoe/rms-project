import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeImagePage } from './change-image.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeImagePageRoutingModule {}
