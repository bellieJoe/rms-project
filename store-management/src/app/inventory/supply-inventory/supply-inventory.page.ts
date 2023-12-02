import { Component, ErrorHandler, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
    private errorHandler : ErrorHandlerService
  ) { }

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

}
