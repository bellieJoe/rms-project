import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, Subject, concat } from 'rxjs';
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

  categories! : any

  addProductForm = this.fb.group({
    name: ['', [Validators.maxLength(1000), Validators.required]],
    description: ['', [Validators.maxLength(5000), Validators.required]],
    image: [''],
    product_category: [undefined],
    age: [undefined]
  })

  get name () {
    return this.addProductForm.get('name')
  }
  get description () {
    return this.addProductForm.get('description')
  }

  async submitAddProduct(){

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
