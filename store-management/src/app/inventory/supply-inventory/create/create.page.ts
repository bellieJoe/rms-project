import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AddSupplyItemData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private inventoryService : InventoryService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private errorHandler : ErrorHandlerService,
    private router : Router
  ) { }

  addSupplyInventoryForm = this.fb.group({
    name : ['', [Validators.required]],
    critical_level : ['', [Validators.required]],
    specifications : ['', [Validators.required]],
  })

  public get name()  {
    return this.addSupplyInventoryForm.get('name')
  }
  public get critical_level()  {
    return this.addSupplyInventoryForm.get('critical_level')
  }
  public get specifications()  {
    return this.addSupplyInventoryForm.get('specifications')
  }

   async addSupplyInventoryForm_submit(){
    console.log("ok")
    const data : AddSupplyItemData = {
      name:  this.name?.value!,
      specifications: this.specifications?.value!,
      critical_level: parseInt(this.critical_level?.value!)
    }
    const loader = await this.loadingCtrl.create({
      message: "Saving Item",
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: "Supply Item successfully saved",
      icon: 'checkmark-circle',
      duration: 1000
    })

    try {
      await loader.present()
      const res = await this.inventoryService.storeSupplyItem(data)
      this.router.navigate(['/supply-inventory'])
      await loader.dismiss()
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }
  

  ngOnInit() {
  }

}
