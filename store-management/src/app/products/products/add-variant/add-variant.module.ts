import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVariantPageRoutingModule } from './add-variant-routing.module';

import { AddVariantPage } from './add-variant.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVariantPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AddVariantPage]
})
export class AddVariantPageModule {}
