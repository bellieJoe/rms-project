import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.page.html',
  styleUrls: ['./product-category.page.scss'],
})
export class ProductCategoryPage implements OnInit {

  constructor(
    private productCategoryService : ProductCategoryService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController
  ) { }

  categories : any = []
  page : number = 1

  async fetchCategories(){
    if(this.page == 1){
      this.categories = []
    }
    try {
      const _categories = await this.productCategoryService.fetchCategories(this.page)
      this.categories = [...this.categories, ..._categories.data]
      console.log(this.categories)
      this.page++
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async refresh(event : any){
    this.page = 1
    this.categories = []
    await this.fetchCategories()
    event.target.complete()
  }

  async onIonInfinite(event : any){
    await this.fetchCategories()
    event.target.complete()
  }

  async searchCategoryByName(event: any){
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
      const _category = await this.productCategoryService.searchCategoryByName(event.target.value)
      this.categories = _category.data
      this.page = 1
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }



  async ngOnInit(){
    const loader = await this.loadingCtrl.create({
      message: 'Loading',
      backdropDismiss: false,
      spinner: 'lines'
    })

    await loader.present()
    this.categories = []
    this.page = 1
    await this.fetchCategories()
    await loader.dismiss()
  }

  async ionViewDidEnter() {
    if(this.categories.length > 0){
      this.categories = []
      this.page = 1
      await this.fetchCategories()
    }
  }

}
