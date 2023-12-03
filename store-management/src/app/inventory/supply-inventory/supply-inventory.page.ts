import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IonModal, ModalController } from '@ionic/angular/common';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-supply-inventory',
  templateUrl: './supply-inventory.page.html',
  styleUrls: ['./supply-inventory.page.scss'],
})
export class SupplyInventoryPage implements OnInit {

  constructor(
    public inventoryService : InventoryService,
    private loadingCtrl : LoadingController,
    private errorHandler : ErrorHandlerService,
    private router : Router,
    private modalCtrl : ModalController
  ) { }

  stocks : any = []
  @ViewChild('viewDetailsModal') detailsModal!: IonModal;
  @ViewChild('viewStocksModal') stocksModal!: IonModal;
  selectedSupplyItem : any

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: 'Loading',
      backdropDismiss: false,
      spinner: 'lines'
    })
    await loader.present()
    this.inventoryService.supplyItems = []
    this.inventoryService.page = 1
    await this.inventoryService.fetchSupplyItems()
    await loader.dismiss()
  }

  async refresh(event : any){
    this.inventoryService.page = 1
    this.inventoryService.supplyItems = []
    await this.inventoryService.fetchSupplyItems()
    event.target.complete()
  }

  async ionViewDidEnter() {
    if(this.inventoryService.supplyItems.length > 0){
      this.inventoryService.supplyItems = []
      this.inventoryService.page = 1
      await this.inventoryService.fetchSupplyItems()
    }
  }

  async onIonInfinite(event : any){
    await this.inventoryService.fetchSupplyItems()
    event.target.complete()
  }

  async searchItemtByName(event : any){
    if(!event.target.value){
      return
    }

    const loader = await this.loadingCtrl.create({
      message: 'Searching Supply Item',
      backdropDismiss: false,
      spinner: 'lines'
    })

    try {
      await loader.present()
      
      const _items = await this.inventoryService.searchSupplyItemByName(event.target.value)
      this.inventoryService.supplyItems = _items.data
      this.inventoryService.page = 1
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async viewDetails(i:any){
    this.selectedSupplyItem = i
    await this.detailsModal.present()
  }

  async editSupplyItem(item:any){
    await this.detailsModal.dismiss()
    this.router.navigate(['/supply-inventory/edit'], {
      state: {
        supply_item : this.selectedSupplyItem
      }
    })
    console.log(item)
  }

  async addStock(item:any){
    await this.detailsModal.dismiss()
    this.router.navigate(['/supply-inventory/add-stock'], {
      state: {
        supply_item : this.selectedSupplyItem
      }
    })
    console.log(item)
  }

  async viewStocks(supply_item: any){
    await this.modalCtrl.dismiss()
    await this.stocksModal.present()
  }

}
