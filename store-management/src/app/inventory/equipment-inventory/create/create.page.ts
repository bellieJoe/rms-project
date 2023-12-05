import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AddEquipmentItemData } from 'src/app/interfaces/form-inputs';
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

  addEquipmentInventoryForm = this.fb.group({
    name : ['', [Validators.required]],
    specifications : ['', [Validators.required]],
  })

  public get name()  {
    return this.addEquipmentInventoryForm.get('name')
  }
  public get specifications()  {
    return this.addEquipmentInventoryForm.get('specifications')
  }

   async addEquipmentInventoryForm_submit(){
    console.log("ok")
    const data : AddEquipmentItemData = {
      name:  this.name?.value!,
      specifications: this.specifications?.value!
    }
    const loader = await this.loadingCtrl.create({
      message: "Saving Item",
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: "Equipment Item successfully saved",
      icon: 'checkmark-circle',
      duration: 1000
    })

    try {
      await loader.present()
      const res = await this.inventoryService.storeEquipmentItem(data)
      this.router.navigate(['/equipment-inventory'])
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
