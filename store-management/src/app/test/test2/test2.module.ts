import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Test2PageRoutingModule } from './test2-routing.module';

import { Test2Page } from './test2.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Test2PageRoutingModule,
  ],
  declarations: [Test2Page]
})
export class Test2PageModule {}
