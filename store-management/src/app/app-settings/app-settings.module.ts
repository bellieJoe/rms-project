import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppSettingsPageRoutingModule } from './app-settings-routing.module';

import { AppSettingsPage } from './app-settings.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppSettingsPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [AppSettingsPage]
})
export class AppSettingsPageModule {}
