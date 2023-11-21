import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  constructor(
    private helperService : HelperService,
    private errorHandler : ErrorHandlerService,
    private orderService : OrdersService
  ) { }

  order : any
  items : any
  total : number = 0
  async ngOnInit() {
    this.order = this.helperService.getRouterNavState().order
    this.order = this.helperService.getRouterNavState().order
    this.items = await this.fetchItems()
    this.compunteTotal()
  }

  print(): void {
    this.helperService.print();
  }

  saveAsImage(): void {
    this.helperService.saveAsImage('contentToPrint', 'outputImage');
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

  async compunteTotal(){
    this.total = 0
    this.items.forEach((val:any) => {
      this.total += (val.price * val.quantity)
    });
  }


}
