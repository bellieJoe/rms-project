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
    private productItemService : ProductItemService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController
  ) { }


  products : any = []
  page : number = 1

  async fetchProducts(){
    if(this.page == 1){
      this.products = []
    }
    try {
      const _users = await this.productItemService.fetchProducts(this.page)
      this.products = [...this.products, ..._users.data]
      // console.log(this.products)
      this.page++
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async refresh(event : any){
    this.page = 1
    this.products = []
    await this.fetchProducts()
    event.target.complete()
  }

  async onIonInfinite(event : any){
    await this.fetchProducts()
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
      
      const _users = await this.productItemService.searchProductByName(event.target.value)
      this.products = _users.data
      this.page = 1
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async ionViewDidEnter() {
    const loader = await this.loadingCtrl.create({
      message: 'Loading',
      backdropDismiss: false,
      spinner: 'lines'
    })

    if(this.products.length <= 0){
      await loader.present()
    }
    this.products = []
    this.page = 1
    await this.fetchProducts()
    await loader.dismiss()
  }

  async ngOnInit() {
    
  }

}
