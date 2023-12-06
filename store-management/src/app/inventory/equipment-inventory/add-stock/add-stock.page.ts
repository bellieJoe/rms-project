import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DateTime } from 'luxon';
import { AddEquipmentItemData, AddEquipmentStocksData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.page.html',
  styleUrls: ['./add-stock.page.scss'],
})
export class AddStockPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private inventoryService : InventoryService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private errorHandler : ErrorHandlerService,
    private router : Router,
    private helperService : HelperService
  ) { }

  today = DateTime.now().plus({day: 1}).toISODate()
  equipment_item : any
  addEquipmentItemStockForm = this.fb.group({
    equipment_item_id : ['', [Validators.required]],
    batch_no : [``, [Validators.required]],
    amount : [``, [Validators.required]],
    date_added : [DateTime.now().toFormat('f-d-Y')],
    equipment_status : ['STOCK'],
  })

  public get batch_no()  {
    return this.addEquipmentItemStockForm.get('batch_no')
  }
  public get equipment_item_id()  {
    return this.addEquipmentItemStockForm.get('equipment_item_id')
  }
  public get amount()  {
    return this.addEquipmentItemStockForm.get('amount')
  }
  public get date_added()  {
    return this.addEquipmentItemStockForm.get('date_added')
  }
  public get equipment_status()  {
    return this.addEquipmentItemStockForm.get('date_added')
  }

  async addEquipmentItemStockForm_submit(){
    console.log("ok")
    const data : AddEquipmentStocksData = {
      equipment_item_id: this.equipment_item.id,
      batch_no: this.batch_no!.value!,
      amount : parseInt(this.amount!.value!),
      date_added: this.date_added?.value!,
      equipment_status: this.equipment_status?.value!
    }
    const loader = await this.loadingCtrl.create({
      message: "Saving Equipment Stock",
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: "Equipment Stock successfully saved",
      icon: 'checkmark-circle',
      duration: 1000
    })

    try {
      await loader.present()
      const res = await this.inventoryService.addEquipmentStocks(data)
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
    this.addEquipmentItemStockForm.patchValue({
      equipment_item_id: this.equipment_item.id,
      batch_no: `BN-${DateTime.now().toMillis()}-${this.equipment_item.id}`
    })
  }



}
