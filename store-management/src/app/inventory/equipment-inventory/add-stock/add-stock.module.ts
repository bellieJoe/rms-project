import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStockPageRoutingModule } from './add-stock-routing.module';

import { AddStockPage } from './add-stock.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStockPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [AddStockPage]
})
export class AddStockPageModule {}
