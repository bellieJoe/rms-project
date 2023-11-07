import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  ) { }

  product : any
  image : any
  phase : number = 1
  variants : any[] = []

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

}
