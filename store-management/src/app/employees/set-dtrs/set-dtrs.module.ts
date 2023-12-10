import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetDtrsPageRoutingModule } from './set-dtrs-routing.module';

import { SetDtrsPage } from './set-dtrs.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetDtrsPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [SetDtrsPage]
})
export class SetDtrsPageModule {}
