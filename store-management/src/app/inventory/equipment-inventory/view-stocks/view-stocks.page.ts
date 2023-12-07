import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonMenu, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AlertController, IonModal } from '@ionic/angular/common';
import { DateTime } from 'luxon';
import { ChangeEquipmentStocksStatusData, EquipmentStocksFilterFormData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-view-stocks',
  templateUrl: './view-stocks.page.html',
  styleUrls: ['./view-stocks.page.scss'],
})
export class ViewStocksPage implements OnInit {

  constructor(
    public inventoryService : InventoryService,
    private loadingCtrl : LoadingController,
    private errorHandler : ErrorHandlerService,
    private router : Router,
    private modalCtrl : ModalController,
    private helperService : HelperService,
    private fb : FormBuilder,
    private toastCtrl : ToastController,
    private alertController : AlertController
  ) { }

  stock : any
  stocks : any = []
  @ViewChild('equipment_stocks_page_menu') filterMenu! : IonMenu
  @ViewChild('view_details_modal') viewDetailsModal! : IonModal
  
  equipment_item : any
  filterForm = this.fb.group({
    equipment_name: '',
    equipment_id: '',
    batch_no: '',
    eq_stock_no: '',
    equipment_status: '',
  })
  async ngOnInit() {
    this.equipment_item = this.helperService.getRouterNavState().equipment_item
    this.filterForm.get('equipment_name')
  }

  async ionViewDidEnter(){
    const loader = await this.loadingCtrl.create({
      message: "Loading",
      spinner: 'lines',
      backdropDismiss: false
    })
    if(this.stocks.length <= 0){
      await loader.present()
    }
    await this.fetchStocks()
    await loader.dismiss()
  }

  async showFilterMenu(){
    await this.filterMenu.open()
  }

  async filterForm_submit(){
    const loader = await this.loadingCtrl.create({
      message: "Loading",
      spinner: 'lines',
      backdropDismiss: false
    })
    await loader.present()
    await this.fetchStocks()
    await this.filterMenu.close()
    await loader.dismiss()
  }

  async fetchStocks(){
    const data : EquipmentStocksFilterFormData = {
      equipment_name: this.filterForm.get('equipment_name')?.value!,
      equipment_item_id: this.filterForm.get('equipment_item_id')?.value!,
      batch_no: this.filterForm.get('batch_no')?.value!,
      eq_stock_no: this.filterForm.get('eq_stock_no')?.value!,
      equipment_status: this.filterForm.get('equipment_status')?.value!,
    }
    console.log(data)
    try {
      const res = await this.inventoryService.getEquipmentStocks(data)
      this.stocks = res.data
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async viewDetails(stock:any){
    this.stock = stock
    await this.viewDetailsModal.present()
  }

  async changeStatus(ev:any){
    console.log(ev.detail.value)
    const successToast = await this.toastCtrl.create({
      message: 'Status changed',
      icon: 'checkmark-circle',
      duration: 900
    })
    try {
      const data : ChangeEquipmentStocksStatusData = {
        equipment_status : ev.detail.value,
        equipment_stock_id : this.stock.id
      }
      const res = await this.inventoryService.changeEquipmentStockStatus(data)
      this.stock = res.data
      this.fetchStocks()
      await successToast.present()
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async doRefresh(ev:any){
    await this.fetchStocks()
    await ev.detail.complete()
  }

}
