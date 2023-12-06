import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonMenu, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DateTime } from 'luxon';
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
    private toastCtrl : ToastController
  ) { }

  @ViewChild('equipment_stocks_page_menu') filterMenu! : IonMenu
  
  equipment_item : any
  filterForm = this.fb.group({
    equipment_name: '',
    batch_no: '',
    eq_stock_no: '',
    equipment_status: '',
  })
  async ngOnInit() {
    this.equipment_item = this.helperService.getRouterNavState().equipment_item
    console.log(DateTime.now().toFormat('f-d-y'))
  }

  async showFilterMenu(){
    await this.filterMenu.open()
  }

  async filterForm_submit(){
    const data = {
      equipment_name: '',
      batch_no: '',
      eq_stock_no: '',
      equipment_status: '',
    }
    const loader = await this.loadingCtrl.create({
      message: "Loading",
      spinner: 'lines',
      backdropDismiss: false
    })
    try {
      
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

}
