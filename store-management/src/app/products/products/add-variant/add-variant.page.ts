import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-variant',
  templateUrl: './add-variant.page.html',
  styleUrls: ['./add-variant.page.scss'],
})
export class AddVariantPage implements OnInit {

  constructor(
    private fb : FormBuilder
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
    console.log(this.addProductVariantForm)
  }

  ngOnInit() {
  }

}
