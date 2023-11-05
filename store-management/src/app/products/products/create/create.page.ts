import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, Subject, concat } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductItemService } from 'src/app/services/product-item.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private productCategoryService : ProductCategoryService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private router : Router,
    private productItemService : ProductItemService
  ) { }

  categories! : any

  addProductForm = this.fb.group({
    name: ['', [Validators.maxLength(1000), Validators.required]],
    description: ['', [Validators.maxLength(5000), Validators.required]],
    product_category: [undefined, [Validators.required]]
  })

  get name () {
    return this.addProductForm.get('name')
  }
  get description () {
    return this.addProductForm.get('description')
  }
  get product_category () {
    return this.addProductForm.get('product_category')
  }

  async submitAddProduct(){
    const loader = await this.loadingCtrl.create({
      message: 'Saving Product',
      backdropDismiss: false,
      spinner: 'lines'
    })
    const toast = await this.toastCtrl.create({
      message: "Product created successfully",
      icon: 'checkmark-circle',
      duration: 2000
    })
    try {
      await loader.present()
      const res = await this.productItemService.addProductItem({
        name: this.addProductForm.value.name!,
        description: this.addProductForm.value.description!,
        product_category: this.addProductForm.value.product_category!
      })
      await this.router.navigate(['/products/change-image'], {
        state: {
          product: res.data
        }
      })
      toast.present()
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      console.log(error)
      this.errorHandler.handleError(error)
    }

  }

  async loadProductCategories(){
    try {
      const res =  await this.productCategoryService.active()
      console.log(res.data)
      return res.data;
      
    } catch (error) {
      this.errorHandler.handleError(error)
    }
    
  }

  async ngOnInit() {
    this.categories = await this.loadProductCategories()
  }



}
