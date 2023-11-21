import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputErrMsgComponent } from './input-err-msg/input-err-msg.component';
import { GridWrapperComponent } from './grid-wrapper/grid-wrapper.component';

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
    InputErrMsgComponent
  ],
  exports: [
    InputErrMsgComponent,
    GridWrapperComponent,
  ],
  providers: []
})
export class ComponentsModule { }
