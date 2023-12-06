import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewStocksPageRoutingModule } from './view-stocks-routing.module';

import { ViewStocksPage } from './view-stocks.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewStocksPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [ViewStocksPage]
})
export class ViewStocksPageModule {}
