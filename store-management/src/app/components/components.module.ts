import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MenuLogoutComponent } from './menu-logout/menu-logout.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';

@NgModule({
  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    MenuLogoutComponent, 
    UserMenuComponent, 
    AddUserFormComponent
  ],
  exports: [
    MenuLogoutComponent, 
    UserMenuComponent, 
    AddUserFormComponent
  ],
})
export class ComponentsModule { }
