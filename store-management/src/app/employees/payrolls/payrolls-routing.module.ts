import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrollsPage } from './payrolls.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollsPageRoutingModule {}
