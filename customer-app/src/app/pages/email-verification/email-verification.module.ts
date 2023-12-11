import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailVerificationPageRoutingModule } from './email-verification-routing.module';

import { EmailVerificationPage } from './email-verification.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailVerificationPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [EmailVerificationPage]
})
export class EmailVerificationPageModule {}
