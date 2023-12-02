import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplyInventoryPageRoutingModule } from './supply-inventory-routing.module';

import { SupplyInventoryPage } from './supply-inventory.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplyInventoryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SupplyInventoryPage]
})
export class SupplyInventoryPageModule {}
