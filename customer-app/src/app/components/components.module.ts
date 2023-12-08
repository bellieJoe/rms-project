import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputErrMsgComponent } from './input-err-msg/input-err-msg.component';
import { GridWrapperComponent } from './grid-wrapper/grid-wrapper.component';
import { TabsComponent } from './tabs/tabs.component';
import { MenuProductCardComponent } from './menu-product-card/menu-product-card.component';
import { AddressSelectorComponent } from './address-selector/address-selector.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { CoordinateSelectorComponent } from './coordinate-selector/coordinate-selector.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LeafletModule
  ],
  declarations: [
    GridWrapperComponent,
    InputErrMsgComponent,
    TabsComponent,
    MenuProductCardComponent,
    AddressSelectorComponent,
    SkeletonLoaderComponent,
    CoordinateSelectorComponent
  ],
  exports: [
    InputErrMsgComponent,
    GridWrapperComponent,
    TabsComponent,
    MenuProductCardComponent,
    AddressSelectorComponent,
    SkeletonLoaderComponent,
    CoordinateSelectorComponent
  ],
  providers: []
})
export class ComponentsModule { }
