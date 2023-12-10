import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollsPageRoutingModule } from './payrolls-routing.module';

import { PayrollsPage } from './payrolls.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollsPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [PayrollsPage]
})
export class PayrollsPageModule {}
