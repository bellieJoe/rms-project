import { NgModule, ɵɵsetComponentScope } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelPageRoutingModule } from './cancel-routing.module';

import { CancelPage } from './cancel.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [CancelPage]
})
export class CancelPageModule {}
