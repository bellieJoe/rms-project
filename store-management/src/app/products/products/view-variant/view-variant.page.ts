import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { ProductVariantService } from 'src/app/services/product-variant.service';

@Component({
  selector: 'app-view-variant',
  templateUrl: './view-variant.page.html',
  styleUrls: ['./view-variant.page.scss'],
})
export class ViewVariantPage implements OnInit {

  constructor(
    private helperService : HelperService,
    private router : Router,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private errorHandler : ErrorHandler,
    private productVariantService : ProductVariantService
  ) { }

  variant  : any

  async ionViewDidEnter(){
  }
  
  async ngOnInit() {
    const variant = this.helperService.getRouterNavState().variant
    this.variant = variant
    this.variant.image = await this.helperService.readImage(variant.image)
  }

  async toggleInMenu(){
    const loader = await this.loadingCtrl.create({
      spinner: 'circular',
      message: 'Updating Menu Visibility',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      icon: 'checkmark',
      message: 'Menu Visibility Updated',
      duration: 2000
    })
    try {
      await loader.present()
      const res = await this.productVariantService.toggleInMenu(this.variant.id)
      this.variant.in_menu = res.data.in_menu
      await loader.dismiss()
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }

  edit(){
    this.router.navigate(['/products/view-variant/edit'], {
      state: {
        variant : this.variant
      }
    })
  }

}
