import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonMenu, LoadingController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
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
    private loadingCtrl : LoadingController,
    private fb : FormBuilder,
    private productCategoryService : ProductCategoryService,
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

  public product_categories : any = []
  @ViewChild('products_filter_menu') private productFilterMenu! : IonMenu

  public filter_product_form  = this.fb.group({
    product_category : 0
  })

  async refresh(event : any){
    this.productItemService.page = 1
    this.productItemService.products = []
    await this.productItemService.fetchProducts(this.filter_product_form.get('product_category')?.value)
    event.target.complete()
  }

  async onIonInfinite(event : any){
    await this.productItemService.fetchProducts(this.filter_product_form.get('product_category')?.value)
    try {
      const res = await this.productCategoryService.active()
      this.product_categories = res.data
      console.log(this.product_categories)
    } catch (error) {
      this.errorHandler.handleError(error)
    }
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
      await this.productItemService.fetchProducts(this.filter_product_form.get('product_category')?.value)
    }
    try {
      const res = await this.productCategoryService.active()
      this.product_categories = res.data
      console.log(this.product_categories)
    } catch (error) {
      this.errorHandler.handleError(error)
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
    await this.productItemService.fetchProducts(this.filter_product_form.get('product_category')?.value)
    await loader.dismiss()
  }

  async viewFilterMenu(){
    await this.productFilterMenu.open()
  }

  async filter_product_form__submit(){
    await this.ionViewDidEnter()
    this.productFilterMenu.close()
  }

  async searchProduct(){
    this.productItemService.fetchProducts(this.filter_product_form.get('product_category')?.value)
  }

}
