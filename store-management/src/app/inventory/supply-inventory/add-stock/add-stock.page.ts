import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { DateTime } from 'luxon';
import { AddSUpplyStocksData } from 'src/app/interfaces/form-inputs';


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

  showExpirationDate : boolean = true
  today = DateTime.now().plus({day: 1}).toISODate()
  supply_item : any
  addSupplyItemStockForm = this.fb.group({
    supply_item_id : ['', [Validators.required]],
    batch_no : [``, [Validators.required]],
    stock_amount : [``, [Validators.required]],
    expiration_date : [``],
  })

  public get batch_no()  {
    return this.addSupplyItemStockForm.get('batch_no')
  }
  public get supply_item_id()  {
    return this.addSupplyItemStockForm.get('supply_item_id')
  }
  public get stock_amount()  {
    return this.addSupplyItemStockForm.get('stock_amount')
  }
  public get expiration_date()  {
    return this.addSupplyItemStockForm.get('expiration_date')
  }

  async addSupplyItemStockForm_submit(){
    console.log("ok")
    const data : AddSUpplyStocksData = {
      supply_item_id: this.supply_item.id,
      batch_no: this.batch_no!.value!,
      stock_amount : parseInt(this.stock_amount!.value!),
      expiration_date: this.expiration_date?.value!
    }
    const loader = await this.loadingCtrl.create({
      message: "Saving Supply Stock",
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: "Supply Stock successfully saved",
      icon: 'checkmark-circle',
      duration: 1000
    })

    try {
      await loader.present()
      const res = await this.inventoryService.addSupplyStocks(data)
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
    console.log(DateTime.now().toISODate())
    this.supply_item = this.helperService.getRouterNavState().supply_item
    this.addSupplyItemStockForm.patchValue({
      supply_item_id: this.supply_item.id,
      batch_no: `SN-${DateTime.now().toMillis()}-${this.supply_item.id}`
    })
  }

  async expirationDate_ticked(event:any){
    this.showExpirationDate = !event.detail.checked
    console.log(event.detail.checked)
  }

}
