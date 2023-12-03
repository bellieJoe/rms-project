import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { EditSupplyItemData } from 'src/app/interfaces/form-inputs';
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

  supply_item : any
  editSupplyInventoryForm = this.fb.group({
    name : ['', [Validators.required]],
    critical_level : ['', [Validators.required]],
    specifications : ['', [Validators.required]],
  })

  public get name()  {
    return this.editSupplyInventoryForm.get('name')
  }
  public get critical_level()  {
    return this.editSupplyInventoryForm.get('critical_level')
  }
  public get specifications()  {
    return this.editSupplyInventoryForm.get('specifications')
  }

   async editSupplyInventoryForm_submit(){
    console.log("ok")
    const data : EditSupplyItemData = {
      id: this.supply_item.id,
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
      const res = await this.inventoryService.updateSupplyItem(data)
      this.router.navigate(['/supply-inventory'])
      await loader.dismiss()
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }
  

  async ngOnInit() {
    this.supply_item = this.helperService.getRouterNavState().supply_item
    this.editSupplyInventoryForm.patchValue({
      name: this.supply_item.supply_name,
      critical_level: this.supply_item.critical_level,
      specifications: this.supply_item.specifications,
    })
  }

}
