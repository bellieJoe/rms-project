import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAccessPageRoutingModule } from './user-access-routing.module';

import { UserAccessPage } from './user-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAccessPageRoutingModule
  ],
  declarations: [UserAccessPage]
})
export class UserAccessPageModule {}
