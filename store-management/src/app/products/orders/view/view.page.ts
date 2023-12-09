import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController, IonModal } from '@ionic/angular/common';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(
    private router : Router,
    private helperService : HelperService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private orderService : OrdersService,
    private alertCtrl : AlertController,
  ) { }

  order : any
  location : any = {}
  @ViewChild('directionViewer') directionViewerModal! : IonModal

  async ngOnInit() {
    this.order = this.helperService.getRouterNavState().order
    this.location = JSON.parse(this.order.location)
  }

  async posMarkAsCompleted(){
    const loader = await this.loadingCtrl.create({
      message: 'Updating Order',
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: 'Updating Order',
      icon: 'checkmark-circle'
    })
    try {
      await loader.present()
      const res = await this.orderService.posMarkAsCompleted(this.order.id)
      this.order = res.data
      await loader.dismiss()
      toast.present()
    } catch (error) {
      await loader.dismiss()
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }

  async viewItems(){
    this.router.navigate(['/orders/view-items'], {
      state: {
        order : this.order
      }
    })
  }

  print(): void {
    this.helperService.print();
  }

  saveAsImage(): void {
    this.helperService.saveAsImage('contentToPrint', 'outputImage');
  }

  viewReceipt(){
    this.router.navigate(['/orders/receipt'], {
      state: {
        order : this.order
      }
    })
  }

  async viewLocation(){
    await this.directionViewerModal.present()
  }

  async cancelOrder(){
    const toast = await this.toastCtrl.create({
      duration: 1000,
      message: 'An order was canceled by the store'
    })
    const alert = await this.alertCtrl.create({
      header: 'Cancel Order',
      message: "Are you sure you want to cancel this order?",
      buttons: ['No', {
        text: 'Yes',
        handler: async()=>{
          try {
            await this.orderService.cancelOrder(this.order.id)
            this.router.navigate(['/orders'])
            toast.present()
          } catch (error) {
            this.errorHandler.handleError(error)
          }
        }
      }]
    })
    alert.present()
  }

  async processOrder(){
    const toast = await this.toastCtrl.create({
      duration: 1000,
      message: 'An order is now in processing'
    })
    const alert = await this.alertCtrl.create({
      header: 'Process Order',
      message: "Are you sure you want to process this order? By clicking yes you approve to process this order",
      buttons: ['No', {
        text: 'Yes',
        handler: async()=>{
          try {
            await this.orderService.processOrder(this.order.id)
            this.router.navigate(['/orders'])
            toast.present()
          } catch (error) {
            this.errorHandler.handleError(error)
          }
        }
      }]
    })
    alert.present()
  }

  async markAsDelivery(){
    const toast = await this.toastCtrl.create({
      duration: 1000,
      message: 'An order is now in delivery'
    })
    const alert = await this.alertCtrl.create({
      header: 'Mark as In Delivery',
      message: "Are you sure you want to mark this order as in delivery?",
      buttons: ['No', {
        text: 'Yes',
        handler: async()=>{
          try {
            await this.orderService.markAsDelivery(this.order.id)
            this.router.navigate(['/orders'])
            toast.present()
          } catch (error) {
            this.errorHandler.handleError(error)
          }
        }
      }]
    })
    alert.present()
  }

}
