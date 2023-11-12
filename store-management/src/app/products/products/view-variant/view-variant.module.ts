import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewVariantPageRoutingModule } from './view-variant-routing.module';

import { ViewVariantPage } from './view-variant.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewVariantPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViewVariantPage]
})
export class ViewVariantPageModule {}
