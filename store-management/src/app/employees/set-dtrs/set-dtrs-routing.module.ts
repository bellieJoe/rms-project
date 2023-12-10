import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetDtrsPage } from './set-dtrs.page';

const routes: Routes = [
  {
    path: '',
    component: SetDtrsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetDtrsPageRoutingModule {}
