import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MenuLogoutComponent } from './menu-logout/menu-logout.component';

@NgModule({
  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ],
  declarations: [MenuLogoutComponent, UserMenuComponent],
  exports: [MenuLogoutComponent, UserMenuComponent],
})
export class ComponentsModule { }
