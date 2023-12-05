import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-equipment-inventory',
  templateUrl: './equipment-inventory.page.html',
  styleUrls: ['./equipment-inventory.page.scss'],
})
export class EquipmentInventoryPage implements OnInit {

  constructor(
    public inventoryService : InventoryService,
    private loadingCtrl : LoadingController,
    private errorHandler : ErrorHandlerService,
    private router : Router,
    private modalCtrl : ModalController
  ) { }

  @ViewChild('viewDetailsModal') detailsModal!: IonModal;
  selectedEquipmentItem : any

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: 'Loading',
      backdropDismiss: false,
      spinner: 'lines'
    })
    await loader.present()
    this.inventoryService.equipmentItems = []
    this.inventoryService.eq_page = 1
    await this.inventoryService.fetchEquipmentItem()
    await loader.dismiss()
  }

  async ionViewDidEnter() {
    if(this.inventoryService.equipmentItems.length > 0){
      this.inventoryService.equipmentItems = []
      this.inventoryService.eq_page = 1
      await this.inventoryService.fetchEquipmentItem()
    }
  }

  async viewDetails(i:any){
    this.selectedEquipmentItem = i
    await this.detailsModal.present()
  }

  async onIonInfinite(event : any){
    await this.inventoryService.fetchEquipmentItem()
    event.target.complete()
  }

  async refresh(event : any){
    this.inventoryService.eq_page = 1
    this.inventoryService.equipmentItems = []
    await this.inventoryService.fetchEquipmentItem()
    event.target.complete()
  }

  async searchItemtByName(event : any){
    if(!event.target.value){
      return
    }

    const loader = await this.loadingCtrl.create({
      message: 'Searching Equipment Item',
      backdropDismiss: false,
      spinner: 'lines'
    })

    try {
      await loader.present()
      
      const _items = await this.inventoryService.searchEquipmentItemByName(event.target.value)
      this.inventoryService.equipmentItems = _items.data
      this.inventoryService.eq_page = 1
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

}
