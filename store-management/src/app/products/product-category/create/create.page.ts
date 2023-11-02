import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

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
    private router : Router
  ) { }

  addCategoryForm = this.fb.group({
    name: ['', [Validators.maxLength(1000), Validators.required]],
    description: ['', [Validators.maxLength(5000), Validators.required]],
   
  })

  get name () {
    return this.addCategoryForm.get('name')
  }
  get description () {
    return this.addCategoryForm.get('description')
  }

  async submitAddCategory(){
    const loader = await this.loadingCtrl.create({
      message: 'Saving Category',
      backdropDismiss: false,
      spinner: 'lines'
    })
    const toast = await this.toastCtrl.create({
      message: "Category created successfully",
      icon: 'checkmark-circle',
      duration: 2000
    })
    try {
      await loader.present()
      const res = await this.productCategoryService.addProductCategory({
        name: this.addCategoryForm.value.name!,
        description: this.addCategoryForm.value.description!
      })
      await loader.dismiss()
      this.router.navigate(['/product-category'])
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  ngOnInit() {
  }

}
