import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertButton, LoadingController, ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { CancelOrderData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { OrderService } from 'src/app/services/order.service';

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
    private orderService : OrderService
  ) { }

  order : any
  

  public cancelAlertButtons : AlertButton[] = [
    {
      text: 'Continue',
      handler: async (ev:any) => {
        const data : CancelOrderData = {
          order_id : this.order.id,
          reason : ev[0]
        }
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        const loader = await this.loadingCtrl.create({
          spinner: 'lines',
          message: 'Canceling Order',
          backdropDismiss: false
        })
        const toast = await this.toastCtrl.create({
          icon: 'checkmark-circle',
          message: 'Order Canceled',
          duration: 1000
        })
        try {
          await loader.present()
          const res = await this.orderService.cancelOrder(data)
          this.order = res.data
          await loader.dismiss()
          toast.present()
        } catch (error) {
          console.log(error)
          await loader.dismiss()
          this.errorHandler.handleError(error)
        }
        
      }
    }
  ];
  public cancelAlertInputs = [
    {
      type: 'textarea',
      id: 'reason',
      label: "Reason",
      placeholder: 'State your reason',
      max: 5000
    },
  ];

  async ngOnInit() {
    this.order = this.helperService.getRouterNavState().order
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

  viewCancelOrder(){
    this.router.navigate(['/orders/cancel'], {
      state: this.order
    })
  }

  
}
