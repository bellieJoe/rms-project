import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonToggle, LoadingController, ToastController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { ProductItemService } from 'src/app/services/product-item.service';
import { ProductVariantService } from 'src/app/services/product-variant.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(
    private router : Router,
    private helperService : HelperService,
    private productItemService : ProductItemService,
    private productVariantService : ProductVariantService,
    private errorHandler : ErrorHandler,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController
  ) { }

  product : any
  image : any
  phase : number = 1
  variants : any[] = []

  @ViewChild('showMenuToggle') showMenuToggle: IonToggle | any;

  async ngOnInit() {
    const navState = this.helperService.getRouterNavState()
    this.product = navState.product

    const res = await this.productItemService.imageReader(this.product.image)
    this.image = res.data

    await this.getVariants()
  }

  async ionViewDidEnter(){
    console.log("Entered")
    if(this.variants.length > 0){
      await this.getVariants()
    }
    if(this.product){
      this.getProduct()
    }
  }

  async getProduct(){
    try {
      const res = await this.productItemService.getById(this.product.id)
      this.product = res.data
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async getVariants(){
    try {
      this.variants = []
      const res = await this.productVariantService.getVariantsByProductItemId(this.product.id)
      res.data.map(async (val:any) => {
        if(val.image){
          const res = await this.helperService.readImage(val.image)
          val.image = res.data
        }
        this.variants.push(val)
        return val
      })
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async updatePhoto(){
    this.router.navigate(['/products/change-image'], {
      state: {
        product : this.product
      }
    })
  }

  async addVariant(){
    this.router.navigate(['/products/add-variant'], {
      state: {
        product : this.product
      }
    })
  }

  editProduct(){
    this.router.navigate(['/products/edit'], {
      state: {
        product: this.product
      }
    })
  }

  async viewVariant(variant : any){
    this.router.navigate(['/products/view-variant'], {
      state: {
        variant : variant
      }
    })
  }

  async showInMenu(ev:any){
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
      if(!await this.hasVariants()){
        await loader.dismiss()
        this.showMenuToggle.checked = false
        return
      }
      const res = await this.productItemService.toggleInMenu(this.product.id)
      this.product.in_menu = res.data.in_menu
      await loader.dismiss()
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
    
    console.log("Show in Menu triggered")
  }

  async hasVariants(){
    if(this.variants.length <= 0){
      const alert = await this.alertCtrl.create({
        message: "You must add a variant first to show this product to the menu",
        animated: true,
        header: "Missing Variants",
        buttons: ['Ok']
      })
      await alert.present()
      return false;
    }
    return true
  }

}
