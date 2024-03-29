import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrollsPage } from './payrolls.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollsPage
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollsPageRoutingModule {}
