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

  addProductForm = this.fb.group({
    name: ['', [Validators.maxLength(1000), Validators.required]],
    description: ['', [Validators.maxLength(5000), Validators.required]],
    image: [''],
    product_category: [''],
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
  ngOnInit() {
  }

  selectedCar: any;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

    ages: any[] = [
      { value: '<18', label: 'Under 18' },
      { value: '18', label: '18' },
      { value: '>18', label: 'More than 18' },
  ];

}
