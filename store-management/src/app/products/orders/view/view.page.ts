import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
    private orderService : OrdersService
  ) { }

  order : any
  async ngOnInit() {
    this.order = this.helperService.getRouterNavState().order
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

}
