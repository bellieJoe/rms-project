import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoryPageRoutingModule } from './product-category-routing.module';

import { ProductCategoryPage } from './product-category.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductCategoryPage]
})
export class ProductCategoryPageModule {}
