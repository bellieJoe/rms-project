import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { ProductVariantService } from 'src/app/services/product-variant.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private helperService : HelperService,
    private fb : FormBuilder,
    private productVariantService : ProductVariantService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private router : Router,
    private location: Location,
  ) { }

  variant : any
  
  phase : number = 1

  editProductVariantForm = this.fb.group({
    id: [null, [Validators.required]],
    name : ['', [Validators.required, Validators.maxLength(1000)]],
    price : ['', [Validators.required]],
    description : ['', [Validators.required, Validators.maxLength(5000)]],
    image : null
  })

  public get name() : any {
    return  this.editProductVariantForm.get('name')
  }
  public get price() : any {
    return  this.editProductVariantForm.get('price')
  }
  public get description() : any {
    return  this.editProductVariantForm.get('description')
  }
  public get image() : any {
    return  this.editProductVariantForm.get('image')
  }

  next(){
    this.phase = 2
  }
  back(){
    this.phase = 1
  }

  async onImageCropped(ev : any){
    console.log("Image Cropped")
    this.editProductVariantForm.patchValue({
      image:ev
    })
  }
  

  async submitEditProductVariant(){
    console.log(this.editProductVariantForm)
    const loader = await this.loadingCtrl.create({
      message: 'Saving Product Variant',
      backdropDismiss: false,
      spinner: 'lines'
    })
    const toast = await this.toastCtrl.create({
      message: "Product variant updated successfully",
      icon: 'checkmark-circle',
      duration: 2000
    })
    try {
      await loader.present()
      const res = await this.productVariantService.updateVariant({
        id: this.editProductVariantForm.value.id!,
        description: this.editProductVariantForm.value.description!,
        name: this.editProductVariantForm.value.name!,
        price: Number(this.editProductVariantForm.value.price!),
        image: this.editProductVariantForm.value.image!,
      })
      await loader.dismiss()
      toast.present()
      this.router.navigate(['/products/view-variant'], {
        state: {
          variant : res.data
        }
      })
      console.log(res)
    } catch (error) {
      await loader.dismiss()
      console.log(error);
      this.errorHandler.handleError(error)
    }
  }

  clearImage(){
    this.editProductVariantForm.value.image = null
  }

  ionViewDidEnter(){
    
  }

  ngOnInit() {
    this.variant = this.helperService.getRouterNavState().variant
    this.editProductVariantForm.patchValue({
      description: this.variant.description,
      name: this.variant.name,
      price: this.variant.price,
      id: this.variant.id
    })
  }

}
