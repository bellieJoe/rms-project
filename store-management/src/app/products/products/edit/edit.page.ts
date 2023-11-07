import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, Subject, concat } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductItemService } from 'src/app/services/product-item.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private productCategoryService : ProductCategoryService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private router : Router,
    private productItemService : ProductItemService,
    private helperService : HelperService
  ) { }

  product : any
  categories! : any

  editProductForm = this.fb.group({
    id: [null, [Validators.required]],
    name: ['', [Validators.maxLength(1000), Validators.required]],
    description: ['', [Validators.maxLength(5000), Validators.required]],
    product_category: [undefined, [Validators.required]]
  })

  get name () {
    return this.editProductForm.get('name')
  }
  get description () {
    return this.editProductForm.get('description')
  }
  get product_category () {
    return this.editProductForm.get('product_category')
  }

 async submitEditProduct(){
  const loader = await this.loadingCtrl.create({
    message: 'Saving Changes',
    backdropDismiss: false,
    spinner: 'lines'
  })
  const toast = await this.toastCtrl.create({
    message: "Product updated successfully",
    icon: 'checkmark-circle',
    duration: 2000
  })
  try {
    await loader.present()
    const res = await this.productItemService.updateProductItem({
      id: this.product.id,
      name: this.editProductForm.value.name!,
      description: this.editProductForm.value.description!,
      product_category: this.editProductForm.value.product_category!
    })
    this.helperService.navigateback()
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
    this.product = this.helperService.getRouterNavState().product
    this.editProductForm.setValue({
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      product_category: this.product.product_category_id
    })
    this.categories = await this.loadProductCategories()
  }

}
