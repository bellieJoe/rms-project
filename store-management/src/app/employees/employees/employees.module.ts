import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeesPageRoutingModule } from './employees-routing.module';

import { EmployeesPage } from './employees.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeesPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [EmployeesPage]
})
export class EmployeesPageModule {}
