import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.page.html',
  styleUrls: ['./view-items.page.scss'],
})
export class ViewItemsPage implements OnInit {

  constructor(
    private router : Router,
    private helperService : HelperService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private orderService : OrdersService
  ) { }

  order : any 
  items : any
   
  async ngOnInit() {
    // const loader = await this.loadingCtrl.create({
    //   message: "Preparing Orders Items",
    //   // spinner: 'lines',
    //   // backdropDismiss: false
    // })
    // await loader.present()
    this.order = this.helperService.getRouterNavState().order
    this.items = await this.fetchItems()
    // await loader.dismiss()
  }

  async fetchItems (){
    try {
      const res = await this.orderService.fetchItems(this.order.id)
      console.log(res.data)
      const _items = res.data.map((val:any)=>{
        val.order_snapshot = JSON.parse(val.order_snapshot)
        return val
      })
      return _items
    } catch (error) {
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }

}
