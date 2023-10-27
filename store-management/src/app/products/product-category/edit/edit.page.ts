import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private productCategoryService : ProductCategoryService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
  ) { }

  navState : any;
  category : any;

  ngOnInit() {
    if(!this.router.getCurrentNavigation()?.extras.state ){
      location.href = "/";
    }
    this.navState = this.router.getCurrentNavigation()?.extras.state;
    this.category = this.navState.category
    this.editCategoryForm.setValue({
      name : this.category.name,
      description: this.category.description
    }) 
  }

  get name () {
    return this.editCategoryForm.get('name')
  }
  get description () {
    return this.editCategoryForm.get('description')
  }

  editCategoryForm = this.fb.group({
    name : ['',[Validators.maxLength(1000), Validators.required]],
    description: ['', [Validators.maxLength(5000), Validators.required]]
  })

  async submitEditCategory(){
    const loader = await this.loadingCtrl.create({
      message: 'Saving Category',
      backdropDismiss: false,
      spinner: 'lines'
    })
    const toast = await this.toastCtrl.create({
      message: "Category updated successfully",
      icon: 'checkmark-circle',
      duration: 2000
    })
    try {
      await loader.present()
      const res = await this.productCategoryService.updateProductCategory({
        id: this.category.id,
        name: this.editCategoryForm.value.name!,
        description: this.editCategoryForm.value.description!
      })
      await loader.dismiss()
      this.router.navigate(['/product-category'])
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

}
