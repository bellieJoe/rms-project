import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MenuLogoutComponent } from './menu-logout/menu-logout.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { InputErrMsgComponent } from './input-err-msg/input-err-msg.component';
import { UserService } from '../services/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { GridWrapperComponent } from './grid-wrapper/grid-wrapper.component';
import { ProductsMenuComponent } from './products-menu/products-menu.component';
import { ProducCategoryListComponent } from './produc-category-list/produc-category-list.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { LyButtonModule } from '@alyle/ui/button';
import { ProductItemListComponent } from './product-item-list/product-item-list.component';
import { MenuProductCardComponent } from './menu-product-card/menu-product-card.component';
import { InventoryMenuComponent } from './inventory-menu/inventory-menu.component';

@NgModule({
  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
  ],
  declarations: [
    MenuLogoutComponent, 
    UserMenuComponent, 
    AddUserFormComponent,
    InputErrMsgComponent,
    UserListComponent,
    GridWrapperComponent,
    ProductsMenuComponent,
    ProducCategoryListComponent,
    ImageCropperComponent,
    ProductItemListComponent,
    MenuProductCardComponent,
    InventoryMenuComponent
  ],
  exports: [
    MenuLogoutComponent, 
    UserMenuComponent, 
    AddUserFormComponent,
    InputErrMsgComponent,
    UserListComponent,
    GridWrapperComponent,
    ProductsMenuComponent,
    ProducCategoryListComponent,
    ImageCropperComponent,
    ProductItemListComponent,
    MenuProductCardComponent,
    InventoryMenuComponent
  ],
  providers: []
})
export class ComponentsModule { }
