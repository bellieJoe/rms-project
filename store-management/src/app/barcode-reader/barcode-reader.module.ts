import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeReaderPageRoutingModule } from './barcode-reader-routing.module';

import { BarcodeReaderPage } from './barcode-reader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeReaderPageRoutingModule
  ],
  declarations: [BarcodeReaderPage]
})
export class BarcodeReaderPageModule {}
