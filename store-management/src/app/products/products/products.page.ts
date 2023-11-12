import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductItemService } from 'src/app/services/product-item.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(
    public productItemService : ProductItemService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController
  ) { }


  // products : any = []
  // page : number = 1

  // async fetchProducts(){
  //   // if(this.page == 1){
  //   //   this.products = []
  //   // }
  //   // try {
  //   //   const _products = this.productItemService.products
  //   //   this.products = [...this.products, ..._products.data]
  //   //   // console.log(this.products)
  //   //   this.page++
  //   // } catch (error) {
  //   //   this.errorHandler.handleError(error)
  //   // }
  // }

  async refresh(event : any){
    this.productItemService.page = 1
    this.productItemService.products = []
    await this.productItemService.fetchProducts()
    event.target.complete()
  }

  async onIonInfinite(event : any){
    await this.productItemService.fetchProducts()
    event.target.complete()
  }

  async searchProductByName(event: any){
    if(!event.target.value){
      return
    }

    const loader = await this.loadingCtrl.create({
      message: 'Searching User',
      backdropDismiss: false,
      spinner: 'lines'
    })

    try {
      await loader.present()
      
      const _products = await this.productItemService.searchProductByName(event.target.value)
      this.productItemService.products = _products.data
      this.productItemService.page = 1
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async ionViewDidEnter() {
    if(this.productItemService.products.length > 0){
      this.productItemService.products = []
      this.productItemService.page = 1
      await this.productItemService.fetchProducts()
    }
  }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: 'Loading',
      backdropDismiss: false,
      spinner: 'lines'
    })
    await loader.present()
    // if(this.productItemService.products.length <= 0){
    //   await loader.present()
    // }
    this.productItemService.products = []
    this.productItemService.page = 1
    await this.productItemService.fetchProducts()
    await loader.dismiss()
  }

}
