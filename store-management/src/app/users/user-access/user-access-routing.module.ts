import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAccessPage } from './user-access.page';

const routes: Routes = [
  {
    path: '',
    component: UserAccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAccessPageRoutingModule {}
