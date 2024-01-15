import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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
    private productVariantService : ProductVariantService,
    private alertCtrl : AlertController
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

  async toggleOnline(){
    const loader = await this.loadingCtrl.create({
      spinner: 'circular',
      message: 'Updating Online Availability',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      icon: 'checkmark',
      message: 'Online Availability Updated',
      duration: 2000
    })
    try {
      await loader.present()
      const res = await this.productVariantService.toggleOnline(this.variant.id)
      this.variant.online_availability = res.data.online_availability
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

  async archiveProductVariant(){
    const alert = await this.alertCtrl.create({
      message : "Are you sure you want to archive this Product Variant?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Archive",
          handler : async () => {
            const loader = await this.loadingCtrl.create({
              message: "Archiving Product Variant"
            })
            try {
              await loader.present()
              await this.productVariantService.archive(this.variant.id)
              const toast = await this.toastCtrl.create({
                message: "Product Variant successfully archived",
                duration: 1000
              })
              this.router.navigate(['/products'])
              await toast.present()
              await loader.dismiss()
            } catch (error) {
              await loader.dismiss()
              this.errorHandler.handleError(error)
            }
          }
        }
      ]
    })
    alert.present()
  }

}
