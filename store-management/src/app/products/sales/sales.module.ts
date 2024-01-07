import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';

import { SalesPage } from './sales.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgChartsModule
  ],
  declarations: [SalesPage]
})
export class SalesPageModule {}
