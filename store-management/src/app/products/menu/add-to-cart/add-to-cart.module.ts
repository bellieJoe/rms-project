import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddToCartPageRoutingModule } from './add-to-cart-routing.module';

import { AddToCartPage } from './add-to-cart.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToCartPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddToCartPage]
})
export class AddToCartPageModule {}
