import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputErrMsgComponent } from './input-err-msg/input-err-msg.component';
import { GridWrapperComponent } from './grid-wrapper/grid-wrapper.component';
import { TabsComponent } from './tabs/tabs.component';
import { MenuProductCardComponent } from './menu-product-card/menu-product-card.component';

@NgModule({
  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GridWrapperComponent,
    InputErrMsgComponent,
    TabsComponent,
    MenuProductCardComponent
  ],
  exports: [
    InputErrMsgComponent,
    GridWrapperComponent,
    TabsComponent,
    MenuProductCardComponent
  ],
  providers: []
})
export class ComponentsModule { }
