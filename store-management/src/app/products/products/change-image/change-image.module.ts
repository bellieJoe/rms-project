import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeImagePageRoutingModule } from './change-image-routing.module';

import { ChangeImagePage } from './change-image.page';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { LyButtonModule } from '@alyle/ui/button';
import { LyExpansionIconModule } from '@alyle/ui';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeImagePageRoutingModule,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    ComponentsModule
  ],
  declarations: [ChangeImagePage]
})
export class ChangeImagePageModule {}
