import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentInventoryPageRoutingModule } from './equipment-inventory-routing.module';

import { EquipmentInventoryPage } from './equipment-inventory.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentInventoryPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [EquipmentInventoryPage]
})
export class EquipmentInventoryPageModule {}
