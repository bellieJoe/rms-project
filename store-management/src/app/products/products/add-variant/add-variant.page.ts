import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductVariantService } from 'src/app/services/product-variant.service';
import { Location } from '@angular/common'
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-add-variant',
  templateUrl: './add-variant.page.html',
  styleUrls: ['./add-variant.page.scss'],
})
export class AddVariantPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private productVariantService : ProductVariantService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private router : Router,
    private location: Location,
    private helperService : HelperService
  ) { }

  phase : number = 1

  addProductVariantForm = this.fb.group({
    product_item_id: null,
    name : ['', [Validators.required, Validators.maxLength(1000)]],
    price : ['', [Validators.required]],
    description : ['', [Validators.required, Validators.maxLength(5000)]],
    image : ['', [Validators.required]]
  })

  public get name() : any {
    return  this.addProductVariantForm.get('name')
  }
  public get price() : any {
    return  this.addProductVariantForm.get('price')
  }
  public get description() : any {
    return  this.addProductVariantForm.get('description')
  }
  public get image() : any {
    return  this.addProductVariantForm.get('image')
  }

  next(){
    this.phase = 2
  }
  back(){
    this.phase = 1
  }

  async onImageCropped(ev : any){
    console.log("Image Cropped")
    this.addProductVariantForm.patchValue({
      image:ev
    })
  }
  

  async submitAddProductVariant(){
    const loader = await this.loadingCtrl.create({
      message: 'Saving Product Variant',
      backdropDismiss: false,
      spinner: 'lines'
    })
    const toast = await this.toastCtrl.create({
      message: "Product variant created successfully",
      icon: 'checkmark-circle',
      duration: 2000
    })
    try {
      await loader.present()
      const res = await this.productVariantService.addVariant({
        product_item_id: this.addProductVariantForm.value.product_item_id!,
        description: this.addProductVariantForm.value.description!,
        name: this.addProductVariantForm.value.name!,
        price: Number(this.addProductVariantForm.value.price!),
        image: this.addProductVariantForm.value.image!,
      })
      await loader.dismiss()
      toast.present()
      this.location.back()
    } catch (error) {
      await loader.dismiss()
      console.log(error);
      this.errorHandler.handleError(error)
    }
  }

  async ngOnInit() {
    this.addProductVariantForm.patchValue({
      product_item_id: this.helperService.getRouterNavState().product.id
    })
  }

}
