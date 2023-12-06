import { color } from '@alyle/ui/color';
import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController, IonModal, ModalController, ToastController } from '@ionic/angular/common';
import { AddSupplyTransData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-supply-inventory',
  templateUrl: './supply-inventory.page.html',
  styleUrls: ['./supply-inventory.page.scss'],
})
export class SupplyInventoryPage implements OnInit {

  constructor(
    public inventoryService : InventoryService,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private errorHandler : ErrorHandlerService,
    private alertCtrl : AlertController,
    private router : Router,
    private modalCtrl : ModalController,
    private userService : UserService
  ) { }

  stockSegmentValue = 1
  stocks : any = []
  stocksLoader : boolean = true;
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
    this.stocksLoader = true
    this.stocks = []
    try {
      const res = await this.inventoryService.getSupplyStocksBySupplyItemId(this.selectedSupplyItem.id)
      this.stocks = res.data
      this.stocksLoader = false
    } catch (error) {
      this.stocksLoader = false
      this.errorHandler.handleError(error)
    }
  }

  async stockSegment_change(event:any){
    this.stockSegmentValue = event.detail.value
  }

  async pullSupplyStock(stock:any){
    console.log(stock)
    const alert = await this.alertCtrl.create({
      message: 'Pull Request',
      inputs: [
        {
          type: "number",
          placeholder: "Enter Amount",
          max: stock.remaining,
          name: 'amount'
        }
      ],
      buttons: [
        {
          text: 'PULL',
          handler: async (ev)=>{
            if(!ev.amount || ev.amount > stock.remaining || ev.amount <= 0){
              const _toast = await this.toastCtrl.create({
                message: 'Invalid Amount',
                icon: 'warning',
                color: 'danger',
                duration: 700
              })
              _toast.present()
              return
            }
            const successToast = await this.toastCtrl.create({
              message: "Stock successfully pulled",
              icon: 'checkmark-circle',
              duration: 1000
            })
            const data : AddSupplyTransData = {
              care_of: this.userService.getAuth().id,
              amount: ev.amount,
              supply_stock_id: stock.id
            }
            try {
              const res = await this.inventoryService.addSupplyTrans(data)
              await this.modalCtrl.dismiss()
              this.ionViewDidEnter()
              await successToast.present()
            } catch (error) {
              this.errorHandler.handleError(error)
            }
          }
        }
      ]
    })
    await alert.present()
  }

}
