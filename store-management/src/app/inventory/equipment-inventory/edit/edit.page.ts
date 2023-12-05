import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { EditEquipmentItemData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private inventoryService : InventoryService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private errorHandler : ErrorHandlerService,
    private router : Router,
    private helperService : HelperService
  ) { }

  equipment_item : any
  editEquipmentInventoryForm = this.fb.group({
    name : ['', [Validators.required]],
    specifications : ['', [Validators.required]],
  })

  public get name()  {
    return this.editEquipmentInventoryForm.get('name')
  }
  public get specifications()  {
    return this.editEquipmentInventoryForm.get('specifications')
  }

   async editEquipmentInventoryForm_submit(){
    console.log("ok")
    const data : EditEquipmentItemData = {
      id: this.equipment_item.id,
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
      const res = await this.inventoryService.updateEquipmentItem(data)
      this.router.navigate(['/equipment-inventory'])
      await loader.dismiss()
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }
  

  async ngOnInit() {
    this.equipment_item = this.helperService.getRouterNavState().equipment_item
    this.editEquipmentInventoryForm.patchValue({
      name: this.equipment_item.name,
      specifications: this.equipment_item.specifications,
    })
  }

}
